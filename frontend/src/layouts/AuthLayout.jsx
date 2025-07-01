import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthLayout({ children }) {
  return (
    <body>
      <main className="container p-5">{children}</main>
    </body>
  );
}

export default AuthLayout;
