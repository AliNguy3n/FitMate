import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layouts/MainLayout";
function HomePage() {
  return (
    <MainLayout>
      <h1>
        <FontAwesomeIcon icon={["fas", "home"]} size="2x" spin /> Home
        <FontAwesomeIcon icon={["fas", "user"]} />
      </h1>
      <h1>Welcome to the Home Page</h1>
    </MainLayout>
  );
}

export default HomePage;
