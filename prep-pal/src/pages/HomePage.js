import { useState, useEffect } from "react";

const HomePage = (props) => {
  //Copy paste formatting
  const [text, setText] = useState("");

  function parseCharacterData(text) {
    // Split the text into lines
    const lines = text.split("\n");

    // Initialize an empty object to hold the character data
    const character = {};

    // Iterate over the lines
    for (let i = 0; i < lines.length; i++) {
      // Trim the line to remove leading/trailing whitespace
      const line = lines[i].trim();

      // Check if the line matches specific patterns and extract data accordingly
      if (line === "TopShelf13") {
        // The character's name is on the next line
        character.name = lines[i + 1].trim();
      } else if (line === "Ability Scores") {
        // The ability scores start on the next line and continue for six lines
        character.abilities = {};
        for (let j = 0; j < 6; j++) {
          const abilityLine = lines[i + j + 1].trim();
          const [ability, score] = abilityLine.split("\n").map((x) => x.trim());
          character.abilities[ability] = Number(score);
        }
      }
    }

    return character;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const character = parseCharacterData(text);
    console.log(character);
    // Here you can do something with the character data, like saving it to state or sending it to a server
  };

  const character = parseCharacterData(text);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows="10"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        {/* <div>{character}</div> */}
      </div>
    </>
  );
};

export default HomePage;
