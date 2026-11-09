# Kids Learning App

An early years learning app for letters, numbers and simple addition. Every screen speaks to the child, so it works for pre-readers.

**Live:** https://kids-learning-app-12ebc.web.app

<!-- ![Kids Learning App](docs/screenshot.png) -->

## Design goal
Young children cannot read instructions yet, so the app keeps one task on screen at a time and reads everything aloud.

## What it does
- **Alphabet:** each letter with picture words and a short spoken phrase
- **Numbers:** counting and number recognition
- **Maths:** addition up to 10 with three answer choices
- Speech feedback through the Web Speech API, sound effects and celebration animations
- Score and mute settings kept in a small global store

## My role
Designed the learning activities and built the app end to end, including deployment.

## Stack
React 19, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, Web Speech API, Firebase Hosting

## Project structure
```
src/
  features/   alphabet, numbers and maths stages
  data/       letter, word and phrase content
  hooks/      useSpeech, useSound
  store/      game state (Zustand)
  components/ layout and error boundary
```

## Run locally
```
npm install
npm run dev
```

## Deploy
```
npm run build
npx firebase deploy --only hosting
```

## Status
Live prototype. Built as an independent project by Franco Ferrari-Accardi and donated to Sovereign House GH for its early years programmes.
