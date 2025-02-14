import React from "react";
import Marquee from "react-fast-marquee";
const Abha = () => {
  return (
    <div>
      <Marquee
        speed={80}
        className="text-red-600 font-semibold my-6 text-xl sm:text-xl bg-amber-500 py-2"
      >
        <div>
          ABHA features coming soon! ABHA API integration with government
          permission pending.
        </div>
      </Marquee>

      <div className="text-5xl mt-20 font-extrabold text-center">
        Coming Soon... 
      </div>
    </div>
  );
};

export default Abha;
