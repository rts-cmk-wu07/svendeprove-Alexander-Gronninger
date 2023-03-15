import { Link } from "react-router-dom";

const ClassCard = ({ image, classTitle, ageLimit, id }) => {
  return (
    <>
      <Link to="/klasse/1">
        <div className="grid w-full mb-4">
          <img
            className="col-start-1 col-end-2 row-start-1 row-end-1 w-full h-full rounded-[39px] rounded-br-none"
            src={image}
            alt={classTitle}
          />
          <div
            className="text-small col-start-1 col-end-2 row-start-1 row-end-1 h-[28%] bg-tertiaryBackground rounded-bl-[39px]
          rounded-tr-[39px] mt-auto pl-[25px] flex flex-col justify-center"
          >
            <h2>{classTitle}</h2>
            <p>{ageLimit}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ClassCard;
