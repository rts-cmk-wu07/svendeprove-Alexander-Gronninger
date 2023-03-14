const Logo = () => {
  return (
    <>
      <div className="absolute top-2/4">
        <div className="ml-[44px]">
          <h1 className="font-Roboto leading-[30px] text-heading logoStrokeTop text-transparent uppercase tracking-tight">
            Landrup
          </h1>
          <h1 className="font-RacingSansOne text-logo logoStrokeBot text-logoText h-[50px] leading-[50px] uppercase">
            Dans
          </h1>
        </div>
        <div className="w-[242px] border-[7px] border-logoLine mt-[14px] drop-shadow-[0px 4px 4px rgb(0 0 0 / 0.25)]"></div>
      </div>
    </>
  );
};

export default Logo;
