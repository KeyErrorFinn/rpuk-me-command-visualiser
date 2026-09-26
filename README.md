# RPUK /me Command Visualiser

<p align="center">
  <a href="https://github.com/KeyErrorFinn/rpuk-me-command-visualiser/commits/main"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/KeyErrorFinn/rpuk-me-command-visualiser" /></a>
  <a href="https://github.com/KeyErrorFinn/rpuk-me-command-visualiser/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/KeyErrorFinn/rpuk-me-command-visualiser" /></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="Sass" src="https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=fff" />
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff" />
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-222222?logo=githubpages&logoColor=fff" />
  <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff" />
</p>

A React web application for composing and previewing formatted `/me` command text used on the Roleplay UK FiveM server.

## Features

- Live preview of entered `/me` text.
- Buttons for bold, italic, new lines, resets, and wanted-star formatting.
- FiveM embedded colour codes.
- FiveM HUD colour codes.
- Custom HTML font colours.
- An example background that approximates the in-game presentation.

## How it works

`src/App.js` holds the generated preview markup and connects the two main panels:

- `Customizer` edits the command text and inserts formatting tokens around the current selection.
- `ExampleOutput` renders the formatted result.

Colour definitions are stored in `src/assets/data/`. Styling is written in SCSS under `src/styles/`. The generated production site is stored in `build/` and deployed through the workflow in `.github/workflows/static.yml`.

## Development

Requires Node.js and npm.

```bash
npm install
npm start
```

The Create React App development server opens the site with live reloading.

## Build and test

```bash
npm test
npm run build
```

The production build honours the `homepage` path in `package.json`.

## Disclaimer

This is an unofficial visualisation tool. It does not connect to FiveM or submit commands to the game, and exact rendering can vary from the live server.

## Live preview

![Live RPUK command visualiser](docs/screenshot.png)

[Open the deployed visualiser](https://git.finnley.co.uk/rpuk-me-command-visualiser/)

## Project flow

```mermaid
flowchart LR
    Input["Command text"] --> Formatter["Formatting controls"]
    Formatter --> Tokens["FiveM formatting tokens"]
    Tokens --> Preview["Live visual preview"]
```
