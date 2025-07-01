import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <body>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </body>
  );
}

export default MainLayout;
