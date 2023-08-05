import { useState, useEffect } from "react";

const GetCharSheet = (props) => {
  //Copy paste formatting
  const [text, setText] = useState("");

  function parseCharacterData(text) {
    const lines = text.split("\n");
    const character = {};
    let section = null;
    let defenseCounter = 0;
    let actionsCounter = 2;
    let bonusActionsCounter = 0;
    let reactionsCounter = 0;
    let otherCounter = 0;
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
      "Blood Hunter",
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
      } else if (line === "Proficiency Bonus") {
        section = "Proficiency Bonus";
      } else if (line === "Speed") {
        section = "Speed";
        character.speed = {};
      } else if (line === "Character Health") {
        section = "Character Health";
        character.health = {};
      } else if (line === "Saving Throws") {
        section = "Saving Throws";
      } else if (line === "Senses") {
        section = "Senses";
        character.senses = {};
      } else if (line === "Proficiencies and Languages") {
        section = "Proficiencies and Languages";
        character.proficiencies = {};
      } else if (line === "Skills") {
        section = "Skills";
        character.skills = {};
      } else if (line === "INITIATIVE") {
        section = "INITIATIVE";
        character.initiative = {};
      } else if (line === "ARMOR CLASS") {
        section = "ARMOR CLASS";
        character.armorClass = {};
      } else if (line === "Defenses and Conditions") {
        section = "Defenses and Conditions";
        character.defenses = {
          resistances: [],
          immunities: [],
          vulnerabilities: [],
        };
      } else if (line === "ACTIONS") {
        section = "ACTIONS";
        character.actions = [];
        character.attacksPerAction = {};
      } else if (line === "BONUS ACTIONS") {
        section = "BONUS ACTIONS";
        character.bonusActions = [];
      } else if (line === "REACTIONS") {
        section = "REACTIONS";
        character.reactions = [];
      } else if (line === "OTHER") {
        section = "OTHER";
        character.other = [];
      }

      // Parse section content
      if (section === "Ability Scores") {
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
            const scoreLine = lines[i + 4].trim(); // Score is in the next line
            const score = Number(scoreLine);
            const modifier = Math.floor((score - 10) / 2); // Calculate the modifier
            character.abilities[ability] = { modifier, score };
          }
        });
      } else if (section === "Saving Throws") {
        // Parse saving throws
        [
          "Strength Saving Throw",
          "Dexterity Saving Throw",
          "Constitution Saving Throw",
          "Intelligence Saving Throw",
          "Wisdom Saving Throw",
          "Charisma Saving Throw",
        ].forEach((savingThrow) => {
          if (line === savingThrow) {
            const modifierLine = lines[i + 3].trim(); // The modifier is in the next line
            const valueLine = lines[i + 4].trim(); // The saving throw value is in the line after the modifier
            const ability = savingThrow.split(" ")[0].toUpperCase(); // Get the ability name from the saving throw
            if (!character.abilities[ability]) {
              character.abilities[ability] = {};
            }
            character.abilities[ability].savingThrow = modifierLine + valueLine;
          }
        });
      } else if (section === "Proficiency Bonus" && line === "PROFICIENCY") {
        character.proficiencyBonus = Number(lines[i + 2].trim());
        section = null; // Reset section
      } else if (section === "Speed") {
        [
          "WALKING",
          "FLYING",
          "BURROWING",
          "CLIMBING",
          "SWIMMING",
          "HOVERING",
        ].forEach((type) => {
          if (line.startsWith(type)) {
            const speedLine = lines[i + 1].trim(); // Get the next line
            const speed = Number(speedLine.slice(0, -3)); // Remove "ft."
            character.speed[type.toLowerCase()] = speed;
            i++; // Skip the next line
          }
        });
        if (line === "SPEED") section = null; // Reset section
      } else if (section === "Character Health" && line === "MAX") {
        character.health.max = Number(lines[i + 1].trim());
      } else if (section === "Senses") {
        const passiveSenses = [
          "PASSIVE WIS (PERCEPTION)",
          "PASSIVE INT (INVESTIGATION)",
          "PASSIVE WIS (INSIGHT)",
        ];
        passiveSenses.forEach((sense) => {
          if (line.includes(sense)) {
            const value = line.match(/^\d+/)[0]; // Extract the number at the beginning of the line
            character.senses[sense] = Number(value);
          }
        });
        const visionSenses = [
          "Darkvision",
          "Blindsight",
          "Tremorsense",
          "Truesight",
        ];
        visionSenses.forEach((sense) => {
          if (line.startsWith(sense)) {
            const value = line.split(sense)[1].trim();
            character.senses[sense] = value;
          }
        });
      } else if (section === "Proficiencies and Languages") {
        const proficiencies = ["ARMOR", "WEAPONS", "TOOLS", "LANGUAGES"];
        proficiencies.forEach((proficiency) => {
          if (line === proficiency) {
            const value = lines[i + 1].trim();
            character.proficiencies[proficiency] = value.split(", ");
          }
        });
      } else if (section === "Skills") {
        const skills = [
          "Acrobatics",
          "Animal Handling",
          "Arcana",
          "Athletics",
          "Deception",
          "History",
          "Insight",
          "Intimidation",
          "Investigation",
          "Medicine",
          "Nature",
          "Perception",
          "Performance",
          "Persuasion",
          "Religion",
          "Sleight of Hand",
          "Stealth",
          "Survival",
        ];
        skills.forEach((skill) => {
          if (line.startsWith(skill)) {
            const modifierLine = lines[i + 2].trim(); // The modifier is in the next line
            const valueLine = lines[i + 3].trim(); // The skill value is in the line after the modifier
            character.skills[skill] = modifierLine + valueLine;
          }
        });
      } else if (section === "INITIATIVE") {
        const modifierLine = lines[i + 1].trim(); // The modifier is in the next line
        const valueLine = lines[i + 2].trim();
        character.initiative = modifierLine + valueLine;
        section = null;
      } else if (section === "ARMOR CLASS") {
        const armorClassLine = lines[i + 2].trim(); // The armor class is on the next line
        character.armorClass = Number(armorClassLine);
        section = null; // Reset section
      } else if (line === "Defenses and Conditions") {
        section = "Defenses and Conditions";
        character.defenses = {
          resistances: [],
          immunities: [],
          vulnerabilities: [],
        };
        defenseCounter = 0;
      } else if (section === "Defenses and Conditions") {
        if (line.endsWith("*")) {
          const defense = line.slice(0, -1).split("*"); // Remove the '*' at the end
          if (defense[0] !== "DEFENSES") {
            // We do not want to include the 'DEFENSES' line
            // Determine the defense type based on the counter
            if (defenseCounter === 0) {
              character.defenses.resistances.push(defense);
            } else if (defenseCounter === 1) {
              character.defenses.immunities.push(defense);
            } else {
              character.defenses.vulnerabilities.push(defense);
            }
            defenseCounter++;
          }
        }
      } else if (line.startsWith("ACTIONS • Attacks per Action:")) {
        // Extract the number at the end of the line using a regular expression
        const attacksPerAction = line.match(/(\d+)$/)[0];
        character.attacksPerAction = Number(attacksPerAction);
      } else if (line === "ACTIONS" &&
      line.startsWith("Upvote/Downvote")) {
        const actionLine = lines[i + 1].trim(); // The bonus action is on the next line
        character.actions.push(actionLine);
      } else if (
        section === "BONUS ACTIONS" &&
        line.startsWith("Upvote/Downvote")
      ) {
        while (lines[i].startsWith("Upvote/Downvote")) {
        const bonusAction = {
            name: lines[i + 2].trim(),
            range: lines[i + 3].trim(),
            hitDc: lines[i + 5].trim(),
            damage: lines[i + 7].trim(),
            notes: lines[i + 8].trim()
          };
          character.bonusActions.push(bonusAction);
          i += 9; // Skip lines associated with this bonus action
        }
      } else if (
        section === "REACTIONS" &&
        line.startsWith("Upvote/Downvote")
      ) {
        const reactionLine = lines[i + 1].trim(); // The reaction is on the next line
        character.reactions.push(reactionLine);
      } else if (section === "OTHER" && line.startsWith("Upvote/Downvote")) {
        const otherLine = lines[i + 1].trim(); // The other action is on the next line
        character.other.push(otherLine);
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
      {" "}
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default GetCharSheet;
