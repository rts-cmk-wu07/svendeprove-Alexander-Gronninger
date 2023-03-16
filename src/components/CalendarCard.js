const CalendarCard = ({ classTitle, classDay, classTime }) => {
  return (
    <>
      <div className="bg-secondaryBackground py-4 px-[36px] rounded-[11px] h-fit w-full my-[30px]">
        <p className="text-heading truncate">{classTitle}</p>
        <p className="capitalize text-small">
          {classDay} {classTime}
        </p>
      </div>
    </>
  );
};

export default CalendarCard;
