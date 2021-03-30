## Development quick start

1. copy `.env` to `.env.local`, get a mapbox token from someone on the team, and add the token to the `.env.local` file.

2. run `npm install`

3. run `npm start`

## Overview

This directory houses four clients, all built from the same create-react-app codebase:

#### 1. main

What it is: the app the voters use to find their drop-off locations
URL: `ballotnav.org`
Hosting: gh-pages in this repo
Dev command: `npm start`
Deploy command: `npm run deploy`
JS Entrypoint: `src/apps/main/index.js`

#### 2. about

What it is: a landing page that describes the app. Voters are redirected here when no elections are happening.
URL: `about.ballotnav.org`
Hosting: gh-pages in the [ballotnav-about](https://github.com/hackforla/ballotnav-about) repo
Dev command: `npm run start-about`
Deploy command: `npm run deploy-about`
JS Entrypoint: `src/apps/about/index.js`

#### 3. demo

What it is: identical to the main app, except that it has a "This is a demo" banner, and the data comes from a file instead of the api.
URL: `demo.ballotnav.org`
Hosting: gh-pages in the [ballotnav-demo](https://github.com/hackforla/ballotnav-demo) repo
Dev command: `npm run start-demo`
Deploy command: `npm run deploy-demo`
JS Entrypoint: `src/apps/main/index.js` (note: this is the same entrypoint as the main app -- differences between the two apps are controlled by the `IS_DEMO` constant in `constants.js`)

#### 4. redirect

What it is: a one-liner that redirects the user from `ballotnav.org` to `about.ballotnav.org`. Deployed in place of the main app when no elections are happening.
URL: `ballotnav.org`
Hosting: gh-pages in this repo
Dev command: `npm run start-redirect`
Deploy command: `npm run deploy-redirect`
JS Entrypoint: `src/apps/redirect/index.js`

## Deploying the demo and about apps

The `demo` and `about` apps are hosted on gh-pages in separate repos. Because of that, gh-pages doesn't work out of the box. To set up deployment for the apps, add remotes for the repos by running these two commands in this repo:
```
git remote add about https://github.com/hackforla/ballotnav-about.git
git remote add demo https://github.com/hackforla/ballotnav-demo.git
```

Then run `git remote -v` and you should see this:
```
about	https://github.com/hackforla/ballotnav-about.git (fetch)
about	https://github.com/hackforla/ballotnav-about.git (push)
demo	https://github.com/hackforla/ballotnav-demo.git (fetch)
demo	https://github.com/hackforla/ballotnav-demo.git (push)
origin	https://github.com/hackforla/ballotnav.git (fetch)
origin	https://github.com/hackforla/ballotnav.git (push)
```

Then you can deploy the two apps by running `npm run deploy-about` or `npm run deploy-demo`. The build files will be pushed to the gh-pages branch of the appropriate repo.

Also, to get the gh-pages deployment working (for all the apps) it was necessary to add a 404.html and modify the index.html to get the single-page routing to work with the BrowserRouter. The code snippets are from the "basic instructions" section here: https://github.com/rafgraph/spa-github-pages
