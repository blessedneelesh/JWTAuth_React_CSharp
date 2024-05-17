import "./Footer.css";
import linkedin from "../../linkedin.png";
const Footer = () => {
  return (
    <>
      <div className="footer bg-dark">
        Developed By: Neelesh Maharjan {"   "}
        <span
          id="linkedin"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/neelesh-maharjan/",
              "_blank"
            )
          }
        >
          <img
            id="linkedin"
            src={linkedin}
            alt="Linked logo"
            style={{ height: "15px", width: "15px" }}
          />
        </span>
      </div>
    </>
  );
};

export default Footer;
