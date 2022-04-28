import React from "react";
import Banner from "../../Assests/Images/banner/Home/TopBanner/banner.png";

function TopBanner() {
  return (
    <div className="text-center">
      <img src={Banner} alt="banner" className="mx-auto w-75" />
    </div>
  );
}
export default TopBanner;
