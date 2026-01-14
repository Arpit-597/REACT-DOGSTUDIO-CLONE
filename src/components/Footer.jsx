import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaDribbble,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} DogStudio Clone. All rights reserved.</p>

      <div></div>

      <div className="icons-container">
        <a href="https://instagram.com/" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://facebook.com/" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://x.com/" target="_blank">
          <FaXTwitter />
        </a>
        <a href="https://dribbble.com/" target="_blank">
          <FaDribbble />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
