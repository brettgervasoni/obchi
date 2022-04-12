// uses the 'storage' permission to store user options and restore them
function save_options() {
    var apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({
      key: apiKey
    }, function() {
      console.log('Options saved')
    });
}

function restore_options() {
    chrome.storage.sync.get({
      key: 'not set'
    }, function(items) {
      document.getElementById('apiKey').value = items.key;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);