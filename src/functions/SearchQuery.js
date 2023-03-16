const SearchQuery = (searchTerm, searchData) => {
  /* 
  Case insensitive search
  Filters an array of objects to see if any keys in said objects match includes term  

  First filter array, which returns an new array based on conditions
  Extract all values out of each object
  Sees if said values includes searchTerm, all case insensitive
  */
  const searchResults =
    searchData && searchTerm
      ? searchData.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchTerm?.toLowerCase())
          )
        )
      : false;

  return searchResults;
};

export default SearchQuery;
