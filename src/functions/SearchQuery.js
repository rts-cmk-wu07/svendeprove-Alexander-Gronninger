import useFetchClasses from "../hooks/useFetchClasses";
import useFetchTrainers from "../hooks/useFetchTrainers";

const SearchQuery = (searchTerm) => {
  const { content: classesList } = useFetchClasses();
  const { content: trainersList } = useFetchTrainers();

  let allList = [];

  if (classesList && trainersList) {
    allList = [...classesList, ...trainersList];
  }

  const searchResults = allList.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm?.toLowerCase())
    )
  );

  return searchResults;
};

export default SearchQuery;
