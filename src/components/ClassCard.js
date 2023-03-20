import { Link } from "react-router-dom";

const ClassCard = ({ image, classTitle, ageLimit, id, day, time }) => {
  return (
    <>
      <Link to={"/klasse/" + id} className="w-fit">
        <div className="grid w-full max-w-[500px] mb-8 overflow-hidden">
          <div className="col-start-1 col-end-2 row-start-1 row-end-1 max-h-[40vh] rounded-[39px] rounded-br-none overflow-hidden">
            <img
              className="w-full h-auto rounded-[39px] rounded-br-none"
              src={image}
              alt={classTitle}
            />
          </div>
          <div
            className="text-small col-start-1 col-end-2 row-start-1 row-end-1 h-[28%] bg-tertiaryBackground rounded-bl-[39px]
          rounded-tr-[39px] mt-auto pl-[25px] flex flex-col justify-center"
          >
            <h2 className="mx-2">{classTitle}</h2>
            <p className="mx-2 capitalize">
              {day} {time}
            </p>
            <p className="mx-2">{ageLimit}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ClassCard;
