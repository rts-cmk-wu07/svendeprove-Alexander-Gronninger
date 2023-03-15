import ClassCard from "../components/ClassCard";
import Heading from "../components/Heading";
import useFetch from "../hooks/useFetch";
import Carousel from "../templates/Carousel";

const Home = () => {
  const {
    data: activities,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities");

  return (
    <>
      <section className="p-4 pt-6">
        <Heading>Aktiviteter</Heading>
        <div className="mt-8 overflow-hidden max-h-[85vh] mb-12">
          <Carousel>
            {!isLoading &&
              activities.map((activity) => {
                return (
                  <ClassCard
                    image={activity?.asset?.url}
                    classTitle={activity?.name}
                    ageLimit={activity?.minAge + "-" + activity?.maxAge + " år"}
                    key={activity?.id}
                    id={activity?.id}
                  />
                );
              })}
            {/* Makes sure the last card does not get hidden behind the nav bar */}
            <div className="h-[66px]"></div>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
