preflightSearch();

async function preflightSearch() {
	chrome.storage.sync.get({
		key: 'not set'
	}, function(items) {
		if (items.key != '' || items.key != 'not set') {
			search(items.key);
		} else {
			console.log('Missing API Key');
			fail();
		}
	});
	
}

async function search(apiKey) {
	let q = $('input[name="q"]')[0].value;
	let response = await fetch('https://127.0.0.1:27124/search/simple/?query='+encodeURI(q)+'&contextLength=100', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Authorization': 'Bearer '+apiKey
		}
	})
	.catch((error) => {
		console.log('Obsidian open with the Local REST API plugin running? Set your API Key in Options?');
		fail();
	});

	let json = await response.json();
	if (json.length > 0) {
		console.log('Obtained results from Obsidian');
		chrome.runtime.sendMessage({
			action: 'updateIcon',
			results: true
		});

		chrome.runtime.sendMessage({ // Inform the background page that this tab should have a page-action.
			from: 'content',
			subject: 'showPageAction',
		});
		
		chrome.runtime.onMessage.addListener((msg, sender, response) => { // Listen for messages from the popup.
			if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) { // First, validate the message's structure.
				var domInfo = {
					json: json,
					// set other response values if wanted...
				};
		
				// Directly respond to the sender (popup), through the specified callback.
				response(domInfo);
			}
		});

	} else {
		console.log('Obsidian did not return any results for the search terms');
		fail();
	}
}

function fail() {
	chrome.runtime.sendMessage({
		action: 'updateIcon',
		results: false
	});

	chrome.runtime.sendMessage({ // Inform the background page that this tab should have a page-action.
		from: 'content',
		subject: 'showPageAction',
	});
	chrome.runtime.onMessage.addListener((msg, sender, response) => { // Listen for messages from the popup.
		if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
			var domInfo = {
				json: undefined,
			};
			response(undefined);
		}
	});
}