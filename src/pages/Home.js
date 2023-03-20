import { useContext } from "react";
import { toast } from "react-toastify";
import ClassCard from "../components/ClassCard";
import Heading from "../components/Heading";
import HomeScrollContext from "../context/HomeScrollContext";
import useFetch from "../hooks/useFetch";
import Carousel from "../templates/Carousel";

const Home = () => {
  const {
    data: activities,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities");

  const { carouselIndex } = useContext(HomeScrollContext);

  error && toast.error("Kunne ikke hente data, prøv igen senere");

  return (
    <>
      <section className="p-[28px] pt-[32px] overflow-hidden sm:px-[70px] mx-auto max-w-[500px]">
        <Heading>Aktiviteter</Heading>
        <div className="mt-8 overflow-hidden max-h-[85vh]">
          <Carousel setPlaylistIndex={carouselIndex}>
            {!isLoading &&
              activities.map((activity) => {
                return (
                  <ClassCard
                    image={activity?.asset?.url}
                    classTitle={activity?.name}
                    ageLimit={activity?.minAge + "-" + activity?.maxAge + " år"}
                    key={activity?.id}
                    id={activity?.id}
                    day={activity.weekday}
                    time={activity.time}
                  />
                );
              })}
            {/* Makes sure the last card does not get hidden behind the nav bar */}
            <div aria-hidden="true" className="h-[66px] sm:h-[500px]"></div>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
