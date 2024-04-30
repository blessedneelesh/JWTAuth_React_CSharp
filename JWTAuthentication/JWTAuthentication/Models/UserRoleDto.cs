namespace JWTAuthentication.Models
{
    public class UserRoleDto
    {
        public string userId { get; set; }
        public string userName {  get; set; }
        public IList<string>? roleName { get; set; }
    }
}
