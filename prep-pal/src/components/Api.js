import { useState, useEffect } from "react";


//API
const URL = "https://www.dnd5eapi.co/api/spells/";

const Api = (props) => {
      //API
  const [results, setResults] = useState([]);
  const [firstSpell, setFirstSpell] = useState(null);
  const controller = new AbortController();

  useEffect(() => {
    async function getData() {
      const response = await fetch(URL, { signal: controller.signal });
      const data = await response.json();
      setResults(data.results);

      if (data.results.length > 0) {
        const firstSpellResponse = await fetch(
          "https://www.dnd5eapi.co" + data.results[0].url,
          { signal: controller.signal }
        );
        const firstSpellData = await firstSpellResponse.json();
        setFirstSpell(firstSpellData);
      }
    }
    getData();
  }, []);
    return ( <></> );
}
 
export default Api;