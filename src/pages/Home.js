import ClassCard from "../components/ClassCard";
import Heading from "../components/Heading";
import Carousel from "../templates/Carousel";

const Home = () => {
  return (
    <>
      <section className="p-4 pt-6">
        <Heading>Aktiviteter</Heading>
        <div className="mt-8 overflow-hidden max-h-[85vh]">
          <Carousel>
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM BLA BLA BLA"
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM BLA BLA "
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM BLA"
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM "
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM SDASW"
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM 325<3r"
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            <ClassCard
              image="https://picsum.photos/350"
              classTitle="LOREM IPSUM 523q534ewsz<at"
              ageLimit="SAMJIDWNMAJUDNSA"
            />
            {/* Makes sure the last card does not get hidden behind the nav bar */}
            <div className="h-[66px]"></div>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
