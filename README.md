# KrakenFlex Back End Solution

## Introduction

This program is built to interface with the KrakenFlex API, fetch outages, filter them based on certain criteria, and post the refined data back to the API.

## Dependencies

This project requires:

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes bundled with Node.js)

## Installation

1. Clone this repository:

   ```bash
   gh repo clone haybarcheezy/Flex

   ```

2. Navigate to the project directory:

   ```bash
   cd flex

   ```

3. Install the required dependencies:

   ```bash
   npm install

   ```

## Running the Program

To execute the main program:

```bash
node src/main.js

```

This will fetch the required data from the API, process it, and then post the final data back to the API.

## Running Tests

Tests have been written using the Jest testing framework. To execute the tests:

```bash
npm test

```

## About the Solution

- The program uses Axios for HTTP requests.
- All interactions with the KrakenFlex API are housed in `src/api/index.js`.
- Data processing utilities are found in `src/utils/index.js`.
- `src/main.js` serves as the main entry point and combines API interactions with data processing to achieve the desired outcome.

### API Resilience

The program incorporates a retry mechanism for the `GET /outages` endpoint. If a 500 status code is received, the program will retry the request up to 3 times before giving up.

## Feedback

For feedback, questions, or suggestions, please contact Hayden@haydenbarnett.dev
