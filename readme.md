# MERNSocket Testing

Playground environment for messing with socket.io using the MERN stack.

## Goal
Utilities to help streamline socket communication between front and back end, aswell as figuring out some sort of persistent session for socket connections. But mainly just to practice the flow of react<--->express. Familiarizing myself the react-dnd library for drag and drop component functionality.

## Some details
Express server backend and React app frontend are isolated into two directories (client and server) each with their own package.json

React app runs on port 3000 for development, and express server on port 3001... So in development, to simulate hosting a react build on the same port as the server I configured the react to proxy to port 3001 (look in the package.json in the client directory).. that takes care of any api calls to our own server without having to specify the different port in the fetch url during development.

I was was testing with MySql since we hadn't learned about mongo yet... Just throw away concept models to give me something to work with.

## Updates
- Started playing around with react-dnd (drag and drop components)... set up temporary conceptual game-components to simulate a tripple triad game view, just to give me some context to work with while I try to familiarize myself with the react-dnd library. (I've commented out the chat/lobby routes in the main app and just rendering the new GameView component)

## Install
To get it to work:

First make a new .env file with the missing variables from the .env.example
- run `npm i` seperately in both client and server directories
- run `source db/schema.sql` from the server directory
- run `npm run seed` from server directory
- run `npm run start` from both directories (server first is probably better)

# Notes
(I've just been using split pane terminals, one in each directory... makes it easier for me)
I haven't made any routes for creating users or anything, so you'll have to look at the existing seed data or modify it and re-run it.