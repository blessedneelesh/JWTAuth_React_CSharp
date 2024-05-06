using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JWTAuthentication.Models;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Sockets;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;


namespace JWTAuthentication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private UserManager<IdentityUser> userManager;
        private SignInManager<IdentityUser> signInManager;
        private IConfiguration configuration;

        public AccountController(UserManager<IdentityUser> userMngr,
            SignInManager<IdentityUser> signInMngr, IConfiguration conf)
        {
            userManager = userMngr;
            signInManager = signInMngr;
            configuration = conf;;
        }

        [HttpGet]
        public  ProfileDto GetProfile() {
            string id= User.FindFirstValue(ClaimTypes.NameIdentifier);
            string userName =User.FindFirstValue(ClaimTypes.Name);
            String email= User.FindFirstValue(ClaimTypes.Email);
           // var users = userManager.Users.ToList();
            return new ProfileDto ( id,userName,email);
        }



        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.NameIdentifier,user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

               foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    roles=userRoles,
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new  { Status = "Error", Message = "User already exists!" });

            IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new  { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new  { Status = "Success", Message = "User created successfully!" });
        }


        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }



        /* [HttpPost]
             public async Task<IActionResult> Register(RegisterViewModel model)
             {
                     var user = new User { UserName = model.Username };
                     var result = await userManager.CreateAsync(user, model.Password);

                     if (result.Succeeded)
                     {
                     //HttpContext.Session.SetString("userID", user.Id);
                  await signInManager.SignInAsync(user, isPersistent: false);
                     return Ok(new { Message = "user SSuccsfully resgitered", Token = "YourGeneratedToken" });

                 }
                 return BadRequest(new { Errors = result.Errors });
             }

             [HttpPost]
             public async Task<IActionResult> Login(LoginViewModel model)
             {
                 // Validate credentials and sign in
                 var result = await signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

                 if (result.Succeeded)
                 {
                     // Set session data, if needed
                     HttpContext.Session.SetString("UserId", model.Username);

                     return Ok(new { message = "Login successful" });
                 }

                 return Unauthorized(new { message = "Invalid credentials" });
             }

             [HttpPost]
             public async Task<IActionResult> LogOut()
             {
                 await signInManager.SignOutAsync();
                 return Ok(new { message = "LogOut successful" });
             }*/
    }
}
