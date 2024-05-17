using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace JWTAuthentication.Models
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        /* [Required(ErrorMessage = "Please enter a username.")]
         [StringLength(255)]
         public string Username { get; set; }

         [Required(ErrorMessage = "Please enter a password.")]
         [DataType(DataType.Password)]
         [Compare("ConfirmPassword")]
         public string Password { get; set; }

         [Required(ErrorMessage = "Please confirm your password.")]
         [DataType(DataType.Password)]
         [Display(Name = "Confirm Password")]
         public string ConfirmPassword { get; set; }*/
    }
}
