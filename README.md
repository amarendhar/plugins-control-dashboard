# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was deployed on [https://unique-cheesecake-923545.netlify.app/](https://unique-cheesecake-923545.netlify.app/)

## Overview

The project aims to create a User Interface (UI) based on the designs provided. It involves creating a web application with toggle switches and tabs to manage plugins. The application interacts with a mock JSON API server to handle GET and POST requests, retrieve data, and update plugin status based on the toggle switches.

## Features
- User Interface: The project implements a user interface based on the provided design, showcasing various plugins with toggle switches to activate/inactivate them.

- Mock JSON API Server: A mock JSON API server was set up to handle GET and POST requests. It serves as the backend for the application, providing data for plugins and handling plugin status updates.

- Data Retrieval: The application fetches data from the mock JSON API server and use it in the components to display the plugins and their current status.

- Toggle Switch Functionality: The toggle switches for each plugin is fully functional, allowing users to enable or disable individual plugins. Any changes in status will be updated on the server.

- Overall Power Switch: An overall power switch was implemented to disable all plugins across all tabs at once. This switch triggers a bulk update of plugin status on the server.

- Tab Navigation: Switching between tabs updates the URL, ensuring proper navigation and displaying the relevant set of plugins for each tab.

## Technologies Used
- Frontend: The project was developed using React.js as the frontend library, along with styled-components for styling.

- Backend: A mock JSON API server was created using tools like json-server or msw to handle GET and POST requests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run type-check`

To analyze TypeScript code for type errors

### Theme

- Used `styled-components` and followed [Material-UI guidelines](https://mui.com/material-ui/customization/default-theme/)
- This application can be converted into SASS with less effort with the existing defined `breakpoints, lightPalette, shadows, shape, spacing, transitions & typography`.
- Created `styled.d.ts` file to access intellisense of them when using in the styled-components.
- All global-styles are given at `src/globalStyles.ts`

### npm packages

- [msw (mock-service-worker)](https://mswjs.io/docs/getting-started/mocks/rest-api) for mocking APIs.
  - The mock-server, mock-API-handlers, and mock-fixtures are available in `src/mocks` folder

### Notes

- Due to time constraints, couldn't add the test-cases.
