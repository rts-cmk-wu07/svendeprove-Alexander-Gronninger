import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { motion } from "framer-motion";

const Welcome = () => {
  return (
    <>
      <Logo />
      <div className="bg-[url('./backgrounds/splash-image.jpg')] bg-cover bg-no-repeat bg-top h-screen">
        <motion.div
          className="mx-auto max-w-fit pt-[85vh]"
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 100, display: "block" }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button>
            <Link
              to="/hjem"
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
