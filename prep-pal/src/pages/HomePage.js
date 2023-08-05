import { useState, useEffect } from "react";
import GetCharSheet from "../components/GetCharSheet";
import CharacterAPI from "../components/CharacterAPI";

const HomePage = (props) => {

  return (
    <>
      <div>
        <CharacterAPI />
      </div>
    </>
  );
};

export default HomePage;
