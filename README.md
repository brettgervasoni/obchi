# Obchi - Obsidian Chrome Integration
This extension searches Obsidian whenever you do a Google search and displays the results in a revealable pane (a Page Action).

When you perform a Google search, the search terms are also used to search Obsidian. Results are returned, with a hit count in brackets. Clicking on a search result will open the note in Obsidian. If search terms returned results, the Page Action icon becomes green. If there are no results, the icon remains grey.

### Requirements
- The extension uses the Community Plugin, Local REST API.
- Set the API Key provided by the Local REST API in the Obchi's options pane.
- Only works for Google at this point, though trivial to add other search engines.

### Install
Clone this repo and load it into Chrome as an unpacked extension.