import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";

const Welcome = () => {
  const [ariaHidden, setAriaHidden] = useState(false);

  return (
    <>
      <Logo />
      <div className="bg-[url('./backgrounds/splash-image.jpg')] bg-cover bg-no-repeat bg-top h-screen">
        <motion.div
          className="mx-auto max-w-fit pt-[85vh]"
          aria-hidden={ariaHidden}
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 100, display: "block" }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button>
            <Link
              to="/home"
              className="w-full h-full text-quaternaryText block text-center leading-full leading-[54px]"
            >
              Kom i gang
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Welcome;
