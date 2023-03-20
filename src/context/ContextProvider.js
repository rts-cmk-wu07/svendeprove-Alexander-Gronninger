import { useState } from "react";
import HomeScrollContext from "./HomeScrollContext";
import UserContext from "./UserContext";

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <HomeScrollContext.Provider value={{ carouselIndex, setCarouselIndex }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </HomeScrollContext.Provider>
  );
}

export default ContextProvider;
