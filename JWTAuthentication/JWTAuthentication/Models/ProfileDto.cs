namespace JWTAuthentication.Models
{
    public class ProfileDto
    {
     
        public ProfileDto(string id, string userName, string email)
        {
            Id = id;
            UserName = userName;
            Email = email;
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

    }
}
