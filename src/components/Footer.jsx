import flagIcon from "../assets/download.jpg";
import logo from "../assets/baseline.png";
import mail from "../assets/mail.png";
import carret from "../assets/carret.png";

const cities = ["Chicago", "Amsterdam", "Paris"];

const socials = [
  { label: "Fb", href: "https://www.facebook.com/dogstudio/" },
  { label: "Ins", href: "https://www.instagram.com/dogstudio.co/" },
  { label: "Dri", href: "https://dribbble.com/dogstudio" },
  { label: "Tw", href: "https://twitter.com/Dogstudio" },
];

export default function Footer() {
  return (
    <footer className="site-footer js-in-view in-view">
      <div className="center">
        {/* ===== TOP ===== */}
        <div className="site-footer-top">
          {cities.map((city, i) => (
            <div
              key={city}
              className={`site-footer-block site-footer-block--address appear-fade-up appear-delay--${
                i + 1
              }`}
            >
              <h3>
                {city} <b>.</b>
              </h3>
            </div>
          ))}

          <div className="site-footer-block site-footer-block--social appear-fade-up appear-delay--3">
            {/* Put big logo SVG in separate component */}
            <h2 className="site-footer-title">
              <img className="baseline" src={logo} alt="Dogstudio logo" />
            </h2>

            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM ===== */}
        <div className="site-footer-bottom">
          <p className="site-footer-contact appear-fade-up">
            We'd love to hear from you{" "}
            <a href="mailto:biz@dogstudio.be">biz@dogstudio.be</a>
          </p>

          <div className="site-footer-right">
            <p className="site-footer-newsletter appear-fade-up appear-delay--4">
              <a href="#">
                <img className="svg svg-mail" src={mail} />
                Subscribe to our newsletter
              </a>
            </p>

            <div className="site-footer-languages appear-fade-up appear-delay--5">
              Language:
              <ul>
                <li className="is-active">
                  <a href="#">
                    <img src={flagIcon} />
                    English
                    <span className="svg svg-caret-right">
                      <img src={carret} />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
