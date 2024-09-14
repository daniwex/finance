import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="h-fit pb-20 bg-beige_100 pb-20">
      <div className="sm:flex">
        <Navbar />
        <div className="sm:ml-[15%] w-full h-full">{children}</div>
      </div>
    </div>
  );
}
