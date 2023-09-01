# KrakenFlex Back End Solution

## Introduction

This program is built to interface with the KrakenFlex API, fetch outages, filter them based on certain criteria, and post the refined data back to the API.

## The Breakdown

1. **Get All Outages**: The first part was straightforward. We hit the `GET /outages` endpoint, grabbed all the outages, and stored them. Nothing too fancy.
2. **Site Info for Norwich Pear Tree**: This was a bit more specific. We needed data for a specific site (`norwich-pear-tree`). So, I crafted a request to `GET /site-info/{siteId}` to fetch the details.
3. **Filtering Outages**: Now, this was fun. We had a bunch of outages, but not all were useful. I filtered out those that started before `2022-01-01T00:00:00.000Z`. Plus, if an outage's device ID wasn't in our site's device list, it got the boot.
4. **Enhancing the Outages**: For the outages that made the cut, we attached a display name. Basically, giving each outage a bit more context.
5. **Posting the Enhanced Outages**: The final step! We sent our enhanced outages to the `POST /site-outages/{siteId}` endpoint.

## Dependencies

This project requires:

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes bundled with Node.js)
- [Axios](https://www.npmjs.com/package/axios) (for HTTP requests)
- [Jest](https://www.npmjs.com/package/jest) (for testing)
- [dotenv](https://www.npmjs.com/package/dotenv) (for environment variables)

## Running the Code

To get this code in action, here's how you can run it:

1. First, make sure you've got Node.js installed. If not, [grab it here](https://nodejs.org/).
2. Next, navigate to the project's root directory in your terminal.
3. Install the necessary packages with `npm install`.
4. Set API key in a .env file or run `export API_KEY=your_actual_api_key`
5. Run the main program with `node src/main.js`.
6. If you want to run the tests, just do `npm test`.

## About the Solution

- The program uses Axios for HTTP requests.
- All interactions with the KrakenFlex API are housed in `src/api/index.js`.
- Data processing utilities are found in `src/utils/index.js`.
- `src/main.js` serves as the main entry point and combines API interactions with data processing to achieve the desired outcome.

## Resilience Against Errors (Bonus)

We're dealing with APIs here, and sometimes they act up. If the API throws a 500 error, we've got that covered. We simply retry the request a few times before finally giving up.

## 🐙 Bonus 🐍 💪

It wasn't a requirement, but I also took an alternative attempt to the KrakenFlex Back End Test using Python instead of JavaScript. (The Python WIP attempt can be found [here](https://github.com/haybarcheezy/PyKraken))
