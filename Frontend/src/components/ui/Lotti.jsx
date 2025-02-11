import Lottie from "lottie-react";
import animationData from "../../assets/upcharBG.json"; // Ensure the correct path

const Lotti = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      className="w-full h-full absolute inset-0 object-cover" // Ensures it covers the screen
    />
  );
};

export default Lotti;
