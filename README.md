# Quickstart guide

- Download and install node.js and npm
- Run `npm install` to install all necessary packages
  - This installs the libraries we use, Express, React, etc.
  - npm is the project manager / package installer for Node.js projects
- Run `npm run build` to build the current project
- Run `npm run start` to launch the built project
  - Navigate to `http://localhost:3000` to see the webpage
  - You can update anything in `/src` or `/server` and it will automatically update in the browser once you save the file
- Run `npm run static` to launch the static site located in `/www`
  - This is how to prototype / test your HTML and CSS without implementing it with React

# What does everything do?

`/src` is where our React components are located. Components are little bits of the website like an input form or a goal icon.

`/public` is where extra files for the website are needed. What's here will be combined with the components in `/src` and served on the main webpage when the project is built and ran.

`/server` is where our backend is located. It has all the API requests our static front-end will need to back to interface with the database and whatnot.

`/build` is our completed website. If this were a real project, you would take these files and host it somewhere on the cloud or whatever.