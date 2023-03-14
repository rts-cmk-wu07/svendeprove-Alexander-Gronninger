import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <>
      <Logo />
      <div className="bg-[url('./backgrounds/splash-image.jpg')] bg-cover bg-no-repeat bg-top h-screen"></div>
    </>
  );
};

export default Welcome;
