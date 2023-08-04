const GetCharSheet = (props) => {
    function parseHTMLAndExtractText(htmlString, elementId) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const targetElement = doc.getElementsByClassName(elementId);
        
        return targetElement ? targetElement.textContent : null;
      }
console.log(parseHTMLAndExtractText("https://www.dndbeyond.com/characters/73701447",  "ct-health-summary__hp-number ct-health-summary__hp-number--dark-mode"))      
    return ( <></> );
}
 
export default GetCharSheet;