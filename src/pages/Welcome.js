import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <>
      <Logo />
      <div className="bg-[url('./backgrounds/splash-image.jpg')] bg-cover bg-no-repeat bg-top h-screen">
        <div className="mx-auto max-w-fit pt-[85vh]">
          <Button>
            <Link
              to="/home"
              className="w-full h-full text-quaternaryText block text-center leading-full leading-[54px]"
            >
              Kom i gang
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
