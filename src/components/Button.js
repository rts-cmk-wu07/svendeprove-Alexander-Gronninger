const Button = ({ children }) => {
  return (
    <>
      <div className="bg-primaryBackground w-[249px] h-[54px] rounded-[10px]">
        {children}
      </div>
    </>
  );
};

export default Button;
