import React from "react";
import Navbar from "./Navbar/Navbar";

interface LayoutTypes {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutTypes) => {
  return (
    <>
      <Navbar />
      <div className="pages">{children}</div>
    </>
  );
};

export default Layout;
