import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import ClassCard from "../components/ClassCard";
import Heading from "../components/Heading";
import SearchQuery from "../functions/SearchQuery";
import useFetch from "../hooks/useFetch";
import Carousel from "../templates/Carousel";

const Search = () => {
  const searchContainer = useRef();

  /* fetching all classes for default view */
  const {
    data: activities,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities");

  error && toast.error("Kunne ikke hente data, prøv igen senere");

  /* search stuff */

  const [searchTerm, setSearchTerm] = useState();
  let searchResults = SearchQuery(searchTerm, activities);

  return (
    <>
      <section className="p-[28px] pt-[32px]">
        <Heading>Søg</Heading>
        <div
          className="flex bg-quaternaryBackground my-4 "
          ref={searchContainer}
        >
          <input
            className="bg-[#00000000] w-full h-[48px] pl-4 outline-none"
            onFocus={() => {
              searchContainer.current.style.outline = "1px solid white";
            }}
            onBlur={() => {
              searchContainer.current.style.outline = "none";
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <FiSearch size="24" className="text-tertiaryText self-center mr-4" />
        </div>

        <div className="mt-8 overflow-hidden max-h-[75vh] mb-12">
          {!isLoading && !searchTerm ? (
            <Carousel>
              {activities.map((activity) => {
                return (
                  <ClassCard
                    image={activity?.asset?.url}
                    classTitle={activity?.name}
                    ageLimit={activity?.minAge + "-" + activity?.maxAge + " år"}
                    key={activity?.id}
                    id={activity?.id}
                    day={activity?.weekday}
                    time={activity?.time}
                  />
                );
              })}
              {/* Makes sure the last card does not get hidden behind the nav bar */}
              <div aria-hidden="true" className="h-[66px]"></div>
            </Carousel>
          ) : searchResults[0] ? (
            <Carousel>
              {searchResults?.map((activity) => {
                return (
                  <ClassCard
                    image={activity?.asset?.url}
                    classTitle={activity?.name}
                    ageLimit={activity?.minAge + "-" + activity?.maxAge + " år"}
                    key={activity?.id}
                    id={activity?.id}
                    day={activity?.weekday}
                    time={activity?.time}
                  />
                );
              })}
              {/* Makes sure the last card does not get hidden behind the nav bar */}
              <div className="h-[66px]"></div>
            </Carousel>
          ) : (
            <p aria-hidden="true" className="text-secondaryText text-normal">
              Ingen resultater
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
