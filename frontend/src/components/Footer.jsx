import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/footer.css";
function Footer() {
  return (
    <footer className="p-2 position-absolute bottom-0">
      <div>
        <div className="row d-flex justify-content-between text-center">
          <div className="col">
            <h3>MAIN FUNCTIONS</h3>
            <ul>
              <li>Courses</li>
              <li>Tracking</li>
              <li>Videos</li>
              <li>Products</li>
            </ul>
          </div>
          <div className="col">
            <h3>SUPPORT</h3>
            <ul>
              <li>094 456 1024</li>
              <li>support@gmail.com</li>
            </ul>
          </div>
          <div className="col">
            <h3>OUR APP</h3>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Guidance</li>
              <li>Releases</li>
            </ul>
          </div>
          <div className="col">
            <h3>CONNECT</h3>
            <div className="d-flex justify-content-between">
              <FontAwesomeIcon icon={["fab", "whatsapp"]} size="3x" />
              <FontAwesomeIcon icon={["fab", "x-twitter"]} size="3x" />
              <FontAwesomeIcon icon={["fab", "facebook"]} size="3x" />
              <FontAwesomeIcon icon={["fab", "facebook-messenger"]} size="3x" />
            </div>
            <p>The best app for gym beginners 🏆.</p>
          </div>
        </div>
        <div className="d-flex justify-content-start gap-4">
          <FontAwesomeIcon icon={["fab", "apple-pay"]} size="3x" />
          <FontAwesomeIcon icon={["fab", "paypal"]} size="3x" />
        </div>
      </div>
      <div>
        <p className="text-end">
          <i>Gym Application </i> | {new Date().getFullYear()}{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
