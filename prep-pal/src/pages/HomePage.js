import { useState, useEffect } from "react";

const HomePage = (props) => {
  //Copy paste formatting
  const [text, setText] = useState("");

  function parseCharacterData(text) {
    const lines = text.split("\n");
    const character = {};
    let section = null;
    // Define a list of possible class names
    const classes = [
      "Wizard",
      "Druid",
      "Ranger",
      "Paladin",
      "Warlock",
      "Sorcerer",
      "Cleric",
      "Bard",
      "Fighter",
      "Monk",
      "Rogue",
      "Barbarian",
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip the "Search Everything..." line and empty lines
      if (line === "Search Everything..." || line === "") {
        continue;
      }

      // Extract player and character names
      if (!character.playerName) {
        character.playerName = line;
        character.characterName = lines[i + 1].trim();
        i++; // Skip the next line
        continue;
      }

      // Skip the "Manage" line and empty lines
      if (line === "MANAGE" || line === "") {
        continue;
      }

      // Extract class and level
      if (!character.class) {
        for (let j = 0; j < classes.length; j++) {
          const classIndex = line.indexOf(classes[j]);
          if (classIndex !== -1) {
            character.class = classes[j];
            character.level = Number(
              line.slice(classIndex + classes[j].length).trim()
            );
            break;
          }
        }
        continue;
      }

      // Check for section headers
      if (line === "Ability Scores") {
        section = "Ability Scores";
        character.abilities = {};
      } else if (line === "Character Health") {
        section = "Character Health";
        character.health = {};
      } else if (line === "Proficiencies and Languages") {
        section = "Proficiencies and Languages";
        character.proficiencies = {};
      } else if (section === "Ability Scores") {
        // Parse ability scores
        [
          "STRENGTH",
          "DEXTERITY",
          "CONSTITUTION",
          "INTELLIGENCE",
          "WISDOM",
          "CHARISMA",
        ].forEach((ability) => {
          if (line === ability) {
            const modifierLine = lines[i + 3].trim(); // Skip one line and + symbol
            const scoreLine = lines[i + 4].trim(); // Score is in the next line
            const modifier = Number(modifierLine);
            const score = Number(scoreLine);
            character.abilities[ability] = { modifier, score };
          }
        });
      } else if (section === "Character Health") {
        // Parse health
        if (line === "CURRENT") {
          const healthLine = lines[i + 1].trim();
          const [current, max] = healthLine.split(" / ").map((x) => Number(x));
          character.health.current = current;
          character.health.max = max;
        }
      } else if (section === "Proficiencies and Languages") {
        // Parse proficiencies and languages
        if (line === "LANGUAGES") {
          const languagesLine = lines[i + 1].trim();
          character.proficiencies.languages = languagesLine.split(", ");
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
