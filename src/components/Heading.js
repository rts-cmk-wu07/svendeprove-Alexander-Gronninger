const Heading = ({ children, optionalCss }) => {
  return (
    <h1
      className={"text-heading text-primaryHeading capitalize " + optionalCss}
    >
      {children}
    </h1>
  );
};

export default Heading;
