import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ATMImage from "../../assets/images/payment-method.avif";
import BCTImage from "../../assets/images/bct.avif";

function Footer() {
  return (
    <footer
      className="flex flex-col justify-center bg-gradient-to-t text-sm"
      style={{ background: "linear-gradient(to top, #0D5EA6, #61A3D3)" }}
    >
      {/* Top section: 4 columns */}
      <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm px-4 ">
          {/* MAIN FUNCTIONS */}
          <div className="text-left">
            <h3 className="font-bold text-white mb-1" style={{ fontSize: '24px' }}>MAIN FUNCTIONS</h3>
            <ul className="text-[#B2EBF2] font-bold space-y-0.5" style={{ fontSize: '16px' }}>
              <li>Courses</li>
              <li>Tracking</li>
              <li>Videos</li>
              <li>Products</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="text-left">
            <h3 className="font-bold text-white mb-1" style={{ fontSize: '24px' }}>SUPPORT</h3>
            <ul className="text-[#B2EBF2] font-bold space-y-0.5" style={{ fontSize: '16px' }}> 
              <li className="text-base">094 456 1024</li>
              <li className="text-base">support@gmail.com</li>
            </ul>
          </div>

          {/* OUR APP */}
          <div className="text-left">
            <h3 className="font-bold text-white mb-1" style={{ fontSize: '24px' }}>OUR APP</h3>
            <ul className="text-[#B2EBF2] font-bold space-y-0.5" style={{ fontSize: '16px' }}>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Guidance</li>
              <li>Releases</li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="text-left">
            <h3 className="font-bold text-white" style={{ fontSize: '24px' }}>CONNECT</h3>
            <div className="flex gap-6 mb-1 mt-2 text-[#B2EBF2]" style={{ fontSize: '30px' }}>
              <FontAwesomeIcon icon={["fab", "whatsapp"]} />
              <FontAwesomeIcon icon={["fab", "x-twitter"]} />
              <FontAwesomeIcon icon={["fab", "facebook"]} />
              <FontAwesomeIcon icon={["fab", "facebook-messenger"]} />
            </div>

          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="flex flex-wrap items-center gap-6 px-4 py-2">
        <h3 className="text-white font-semibold text-sm">PAYMENT METHODS:</h3>
        <FontAwesomeIcon icon={["fab", "apple-pay"]} size="5x" className="text-white" />
        <FontAwesomeIcon icon={["fab", "paypal"]} size="3x" className="text-white" />
        <img src={ATMImage} alt="ATM" className="h-10 object-contain" />
      </div>

      {/* Certification */}
      {/* <div className="flex justify-center mt-1 mb-1">
        <img src={BCTImage} alt="BCT" className="h-10 object-contain" />
      </div> */}

      {/* Bottom Bar */}
      <div className="flex flex-wrap justify-between bg-[#0D5EA6] px-4 py-1">
        <p className="text-end text-white text-xs">
          <i>Gym Application</i> | <b>{new Date().getFullYear()}</b>
        </p>
        <p className="text-white text-xs italic">
          The best app for gym beginners 🏆.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
