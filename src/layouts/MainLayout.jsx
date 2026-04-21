import React from "react";
import NavBar from "../components/NavBar";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="main-content">{children}</main>
    </>
  );
}

export default MainLayout;
