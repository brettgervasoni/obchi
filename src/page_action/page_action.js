// Update the relevant fields with the new data.
const setDOMInfo = info => {
    if (info != undefined && info.json != undefined) {
        var table = document.getElementById("results");
        for(var i = 0; i < info.json.length; i++) {
            var firstRow = table.insertRow(-1);
            firstRow.id = info.json[i].filename;

            var firstCell = firstRow.insertCell(0);
            firstCell.innerHTML = info.json[i].filename + ' ('+ info.json[i].matches.length+' matches)';

            // var secondRow = table.insertRow(-1); // for context, but I've decided to disregard it for now
            // var secondCell = firstRow.insertCell(0);
            // for(var x = 0; x < info.json[i].matches.length; x++) {
            //     secondCell.innerHTML += info.json[i].matches[x].context+"<br />";
            // }
        }

        const rows = document.querySelectorAll('tr');
        rows.forEach(row => {
            row.addEventListener('click', function handleClick(event) {
                openInObsidian(row.id);
            
                row.setAttribute('style', 'background-color: lightblue;');
            });
        });
    } else {
        document.getElementById("no-results").style.display = 'block';
    }
};
  
  // Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            // ...also specifying a callback to be called 
            //    from the receiving end (content script).
            setDOMInfo);
    });
});

function openInObsidian(filename) {	
    fetch('https://127.0.0.1:27124/open/'+encodeURI(filename), {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Authorization': 'Bearer e2e7692a342c8929d7416fd07ea6c58e88d668debd0c3a19badf53ef630c9647' // super secret
		}
    });
}