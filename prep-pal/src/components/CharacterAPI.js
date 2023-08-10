import React, { useEffect, useState } from "react";

const CharacterAPI = (props) => {
  const [data, setData] = useState(null);
  const [character, setCharacter] = useState(null);

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:5000/proxy/https://character-service.dndbeyond.com/character/v3/character/${props.id}`
  //   )
  //     .then((response) => response.json())
  //     .then(({ data }) => {
  //       setData(data);
  //       const newCharacter = {
  //         name: data.name,
  //         // baseHitPoints: data.baseHitPoints,
  //         // actions: data.actions,
  //         // strength: data.stats[0],
  //         // dextertiy: data.stats[1],
  //         // constitution: data.stats[2],
  //         // intelligence: data.stats[3],
  //         // wisdom: data.stats[4],
  //         // charisma: data.stats[5],
  //         // racialTraits: data.race.racialTraits, //data.race.racialTraits[0].definition.description
  //         // walkSpeed: data.race.weightSpeeds.normal.walk,
  //         // flySpeed: data.race.weightSpeeds.normal.fly,
  //         // burrowSpeed: data.race.weightSpeeds.normal.burrow,
  //         // swimSpeed: data.race.weightSpeeds.normal.swim,
  //         // climbSpeed: data.race.weightSpeeds.normal.climb,
  //         // classLevel: data.classes.level,
  //         // class: data.classes.definition.name,
  //         // spells: data.spells.class,
  //         // racialActions: data.actions.race,
  //         // classActions: data.actions.class,
  //         // modifiers: data.modifiers,
  //         // classSpells: data.classSpells.spells,
  //       };
  //       setCharacter(newCharacter);
  //     })
  //     .catch((error) => console.error(error));
  // }, [props.id]);
  // //   console.log(data.race.racialTraits[0].definition.description)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/discord/user")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user)

  return (
    <div className="App">
      {/* DNDBEYOND
      {character && (
        <>
          <h1>{character.name}</h1>
          {/* <h2>{character.baseHitPoints}</h2>
          <h2>{character.actions.class[0].actionType}</h2>
          <h2>{character.walkSpeed}</h2> 
        </>
      )} */}
{/* DISCORD */}
      {user ? (
        <>
          <h1>{user.username}</h1>
          <p>{user.id}</p>
          {/* Add more user properties as needed */}
        </>
      ) : (
        <p>An error occurred while fetching the user information.</p>
      )}
    </div>
  );
};

export default CharacterAPI;
