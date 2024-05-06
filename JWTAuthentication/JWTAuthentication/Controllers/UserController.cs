using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using JWTAuthentication.Models;
using Microsoft.AspNetCore.Authorization;

namespace JWTAuthentication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        UserManager<IdentityUser> userManager;
        RoleManager<IdentityRole> roleManager;
        public UserController(UserManager<IdentityUser> userMngr,RoleManager<IdentityRole> roleMngr) { 
            userManager = userMngr;
            roleManager = roleMngr;
        }

        [HttpGet]
        //[AllowAnonymous]
        public async Task<List<UserRoleDto>> getUsers()
        {
            List<UserRoleDto> userRole = new List<UserRoleDto>();

            foreach (IdentityUser user in userManager.Users)
            {
                //users.Add(user);
                UserRoleDto userRoleDto = new UserRoleDto();
                userRoleDto.userId = user.Id;
                userRoleDto.userName = user.UserName;
                userRoleDto.roleName = await userManager.GetRolesAsync(user);
                userRole.Add(userRoleDto);

            }
            return userRole ;
        }

        [HttpPost]
        [Authorize(Roles="Admin")]
        public async Task<IdentityResult> Delete(string id)
        {
            IdentityUser user = await userManager.FindByIdAsync(id);
            IdentityResult result = await userManager.DeleteAsync(user);
            return result;
        }

        [HttpPost]
        public async Task<IdentityResult> CreateAdminRole()
        {
            IdentityResult res =await roleManager.CreateAsync(new IdentityRole("Admin"));
            return res;
        }

        [HttpPost]
        //[AllowAnonymous]
        public async Task<IdentityResult> AddToAdmin(string id)
        {
            IdentityRole adminRole = await roleManager.FindByNameAsync("Admin");
            IdentityUser user = await userManager.FindByIdAsync(id);
            IdentityResult res=await userManager.AddToRoleAsync(user, adminRole.Name);
            return res;
        }


        [HttpPost]
        public async Task<IdentityResult> RemoveFromAdmin(string id)
        {
            IdentityUser user = await userManager.FindByIdAsync(id);
            return await userManager.RemoveFromRoleAsync(user, "Admin");

        }
        [HttpPost]
        public async Task<IdentityResult> DeleteRole(string id)
        {
            IdentityRole role = await roleManager.FindByIdAsync(id);
           return await roleManager.DeleteAsync(role);
  
        }
        [HttpGet]
        public async Task<List<IdentityRole>> GetAllRoles()
        {
            var roles = roleManager.Roles.ToList();
            return roles;
        }

    }
}
