import Image from "next/image";
import React from "react";

export const Hero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {children}
      </div>
    </div>
  );
};
