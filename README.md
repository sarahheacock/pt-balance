# create-react-app with a Node server on Heroku
## Front-End
The front-end is built with react, redux, and react-router. The most central react state is the edit state. Changes to the edit state are focused on a more functional approach. When an edit button is clicked, that section’s content is copied into the edit state. If the client decides to click ‘Edit Content’, the state replaces the content in the data base and the edit state becomes an empty object again.

## Back-End
The back-end is built with express and is connected to a mongo database. JSON web tokens are used to authenticate admin upon login.  After building Patty’s Pet Pals, I reconfigured most of the logic of this site to the back-end. While slightly less efficient, the code is more organized and testable. Routes are ordered such that api calls are answered first, followed by remaining static file calls, and finally followed by an error handler to catch any unknown routes. This allows for server-side and client-side rendering. I hope to further improve performance by upgrading to an isomorphic solution later.

## Local Development

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
