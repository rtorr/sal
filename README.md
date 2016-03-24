# Sal

Trying to save you from configuration. This project is not meant to be everything, but a nice place to start.

## Some information you should know before starting:

Setting up the port for production right now is hardcoded to `5000`
becuase I wanted this project to work with Dokku from the start.

Please refer to the notes in `config.js` and `src/server/index.js`

## Running this application for development

```
npm install
sal -rd
```

## Deploying with [Dokku](http://dokku.viewdocs.io/dokku/)

After you have set up your Dokku server [please follow these instructions](http://dokku.viewdocs.io/dokku/application-deployment/)

## Using the `sal` commandline tool:

```
npm install sal -g
```

```
-------------------------- Sal --------------------------
          use "sal --help" to see all options
              https://github.com/rtorr/sal
---------------------------------------------------------

Options:
  --run, -r   Run a sal application - `sal --run <path>`
  --test, -t  Run your tests
  --new, -n   Create a new Sal project - `sal --new <path>`
  --dev, -d   Set process.env.NODE_ENV to dev
  --prod, -p  Set process.env.NODE_ENV to production
  --kill, -k  Kill all Sal servers (This maps to pm2)
  --help      Show help
```

## Features:

By default you get React (JSX), ES6, Typescript, Expressjs, Mocha, and Karma.

## VS Code

Meant to be used with [vscode](https://code.visualstudio.com/), [with these settings](https://github.com/rtorr/vscode). More to come on this.

- Supports build and test vscode commands

![Imgur](http://i.imgur.com/5n14Bms.png)
