import React from "react";
import Navbar from "../Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col justify-between overflow-x-hidden font-sans">
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-20 flex min-h-screen flex-grow flex-col items-stretch overflow-hidden pt-16">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
