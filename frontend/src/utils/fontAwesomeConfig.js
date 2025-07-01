import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faShoppingCart,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons"; // Solid icons : fas
import { far } from "@fortawesome/free-regular-svg-icons"; // Regular icons : far
import {
  faFacebook,
  faFacebookMessenger,
  faXTwitter,
  faWhatsapp,
  faApplePay,
  faPaypal,
} from "@fortawesome/free-brands-svg-icons"; // Brand icons : fab

// Add icons to library
library.add(faAnglesLeft, faAnglesRight);
library.add(faHome, faUser, faShoppingCart);
library.add(faFacebook, faFacebookMessenger, faXTwitter, faWhatsapp);
library.add(faApplePay, faPaypal);
library.add(far);
