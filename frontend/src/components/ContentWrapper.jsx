import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-[15px] ">{children}</div>
  );
};

export default ContentWrapper;
