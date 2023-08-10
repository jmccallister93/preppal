import { useState, useEffect } from "react";
import GetCharSheet from "../components/GetCharSheet";
import CharacterAPI from "../components/CharacterAPI";
import Bot from "../components/bot";

const HomePage = (props) => {
  const [id, setId] = useState('')

  const handleInputChange = (event) => {
    setId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform other actions on form submit here, if needed
  }

  return (
    <>
      <div>
      <form onSubmit={handleSubmit}>
          <input type="text" value={id} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
        {/* <CharacterAPI id={id}/> */}
        <Bot />
      </div>
    </>
  );
};

export default HomePage;
