import React, { useEffect, useState } from 'react';

const CharacterAPI = (props) => {
    const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/proxy/https://character-service.dndbeyond.com/character/v3/character/35293785')

      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []); // The empty array means this effect runs once on mount, and not on updates

  return (
    <div className="App">
      {/* Render your data here. This is just a simple example. */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
 
export default CharacterAPI;