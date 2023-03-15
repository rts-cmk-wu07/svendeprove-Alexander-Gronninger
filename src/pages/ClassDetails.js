import Button from "../components/Button";

const ClassDetails = () => {
  return (
    <>
      {/* big is 489, small is 268 */}
      <section className="bg-primaryBackground">
        <div className="grid">
          <img
            className="h-auto w-full col-start-1 col-end-2 row-start-1 row-end-2"
            src="https://picsum.photos/350"
            alt=""
          />
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 place-self-end mb-6 mr-[21px]">
            <Button>
              <button className="w-full h-full text-tertiaryText">
                Tilmeld
              </button>
            </Button>
          </div>
        </div>
        <div className="p-8 pt-6">
          <h2 className="text-secondaryText font-medium">
            Junior Fitness Dance
          </h2>
          <p className="text-secondaryText font-small">10-12 år</p>
          <p className="text-secondaryText font-small mt-2 mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
            elementum lorem nulla vitae felis auctor pretium suspendisse et.
            Condimentum fringilla odio vitae interdum adipiscing odio volutpat.
            Faucibus gravida quis nisi, purus morbi leo nulla a. Mattis
            tincidunt phasellus enim, egestas non ultrices.
          </p>
        </div>
      </section>
    </>
  );
};

export default ClassDetails;
