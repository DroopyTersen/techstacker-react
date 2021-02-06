
# New React Project w/ Snowpack Setup
- This would be a faster/lighter alternative to something like `create-react-app`.

## Barebones Setup
The following steps will take you from zero to a web app running locally 
1. Create a new folder and initialize an NPM project.
    ```sh
    mkdir snowpack-demo
    cd snowpack-demo
    npm init
    ```
2. Install snowpack as a dev dependency
    ```sh
    npm install --save-dev snowpack 
    ```
3. Add the Snowpack npm scripts to `package.json`
    ```
    "scripts": {
        "start": "snowpack dev",
        "build": "snowpack build"
    }
    ```
4. Create an `index.html` at the root (we'll move it somewhere else later).
    - Notice the `type="module"` on the script tag. Snowpack leverages the new Ecmascript modules to make itself so fast.

    *index.html*
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="APP_TITLE" />
        <title>APP_TITLE</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="entry.js"></script>
    </body>
    </html>
    ```
5. Create an `entry.js` file at the root of the project.

    *entry.js*
    ```js
    document.querySelector("#root").innerHTML = "<h1>Hello World!</h1>";
    ```
6. Start the app in local development mode.
    - Notice how it live reloads when you update a file
    ```
    npm start
    ```

### Other notable stuff
- You can change your `entry.js` file to `entry.ts` and start writing Typescript with zero setup.
- You can import a CSS file into your `entry.js` and it would get automatically included with zero setup
- If you create another file for your entry to import, when you are in `dev` mode, it will get pulled in via Ecmascript module import and NOT bundled. This means when you change a file while developing, only that file needs to get rebuilt, providing a blazing fast feedback loop that skills with the project. This is the main selling point of Snowpack.

## Basic React Setup

1. Install react
    ```sh
    npm install react react-dom
    # If you are doing typescript then also the React types
    npm install --save-dev @types/react @types/react-dom
    ```
2. Rename your `entry.js` to `entry.jsx` then add the following code 
    - `entry.ts` to `entry.tsx` if you're TypeScript'ing

    *entry.jsx*
    ```jsx
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";

    ReactDOM.render(<App />, document.getElementById("root"));
    ```
3. Create `App.jsx` and put the following in it. 
    - Keep that extra counter code, we'll use it in the next step to demonstrate React Fast Refresh
    ```jsx
    import React, { useState, useEffect } from "react";

    export default function App() {
        // Create the count state.
        const [count, setCount] = useState(0);
        // Update the count (+1 every second).
        useEffect(() => {
            const timer = setTimeout(() => setCount(count + 1), 1000);
            return () => clearTimeout(timer);
        }, [count, setCount]);

        return (
            <div>
                <h1>Hi From App!</h1>
                <p>
                    Count: <code>{count}</code>
                </p>
            </div>
        );
    }
    ```
3. Start the app, `npm start`, and make sure things are working
    - If you change `App.jsx` you should see it update right away in your browser. 
    


## React Fast Refresh
When running the app and changing a file, did you notice how the count resets back to zero with each file change? This means our React state is resetting with each file change. 

> This can get pretty frustrating/time consuming if you are building complex forms that require a lot of manual entry to get to the code you are working on.

React Fast Refresh solves this problem and smartly maintains your React state/context when a file updates.

1. Create a Snowpack config file
    ```sh
    npx snowpack init
    ```
    - This should create `snowpack.config.js` at the root of your project
    - If you already have this file, you can skip this step.

2. Install React Fast Refresh
    ```
    npm install @snowpack/plugin-react-refresh --save-dev
    ```
3. Add the plugin to `snowpack.config.js`
    ```
    ...
    plugins: ['@snowpack/plugin-react-refresh'],
    ...
    ```
4. Add the following to the bottom of `entry.jsx`
    ```jsx
     // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
    // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
    if (import.meta.hot) {
        import.meta.hot.accept();
    }
    ```
5. Start you app up again (`npm start`) and try updating `App.jsx`
    - You should be able to update App.jsx without resetting the `count`.


## Project Structure Setup

Regardless of how you organize your project or what you name your folders, you'll most likely be interested in solving the following 3 problems: 
1. Static things (`/public`) should be served up relative to the server root `/`
    - `/public/images/mylogo.jpg` -> `http://localhost:8080/images/mylogo.jpg`
2. Tranpiled source code (`/src`) should be served up as `/dist`
    - `/src/entry.ts` -> `http://localhost:8080/dist/entry.js
    - Notice if you are using Typescript, your file extension switches to `.js`.
3.  Extra Credit: Project relative imports
    - If you need to import something from ANYWHERE in you app, you want to be able to import without having to deal with the "dot explosion" of relative paths.  
    - Snowpack calls this a project `alias`.
    ```js
    // Yucky
    import Table from "../../../../components/Table";
    import usePersistedState from "../../../../hooks/usePersistedState"
    // Ahhh much better...
    import Table from "@components/Table"
    import usePersistedState from "@hooks/usePersistedState"
    ```

*Target project folder stucture* - You certainly don't have to follow this, I'm just showing it so you can map what I'm doing to what you might have setup.
```
/public
    /fonts
    /images
    index.html
/src
    entry.js

    /hooks
        ==============
        I like to put hooks that aren't tightly
        coupled to my app in a top level folder
        so I can quickly copy them quickly across projects
        ==============
        useAsyncData.js
        useDebounce.js
        usePersistedState.js
        ...

    /components
        ==============
        Same story here as hooks. This is for app
        agnositic components only. If a component
        is coupled to something in my app it will
        go in a feature folder next to everything
        else related to that feature.
        ==============
        /BigDate
        /Card
        /Grid
        /Table
        ...

    /App
        /layout
            Nav.jsx
            Footer.jsx
        App.jsx

    /FeatureA
        /hooks
        /components
            FeatureAForm.jsx
            FeatureACard.jsx
            FeatureAGrid.jsx
        featureA.data.js
        featureA.screens.jsx

    /FeatureB
        ...similar structure as FeatureA

package.json
package-lock.json
snowpack.config.js
README.md
.prettierrc
```

The following steps assume you already have a `snowpack.config.js`. If you don't, run `npx snowpack init` .

### Setup the `/public` and `/src` folder

1. Create a new folder named `/public` and move `index.html` into it. 
    - This folder will house your index.html as well as other static assets like images and fonts.
2. Create a new folder named `/src` and move the javascript/typescript files into it.

3. Next, you want tell snowpack to serve up these new folders
    - Update `snowpack.config.js` to setup the `mount` configuration
        ```js
        ...
        mount: {
            public: "/",
            src: "/dist",
        }
        ...
        ```
    - Everything in the `/public` folder should be served from the root of the app
        - `/public/index.html` -> `http://localhost:8080`
        - `/public/images/mylogo.jpg` -> `http://localhost:8080/images/mylogo.jpg`
    - Everything is the `/src` folder should be served from a `/dist` folder once it's been transpiled
        - `/src/entry.js` -> `http://localhost:8080/dist/entry.js`
        - `/src/components/Card.tsx` -> `http://localhost:8080/dist/components/Card.js`

4. Lastly update the script tag inside of `/public/index.html` to point to `/dist/entry.js`.

### Setup the project aliases

In my project I want my commonly shared hooks and components to be easily importable without having to deal with the "dot explosion" of relative paths.  

1. Setup the Snowpack `alias` in `snowpack.config.js`
    ```
    ...
    alias: {
        "@components": "./components",
        "@hooks": "./src/hooks",
    },
    ...
    ```

**If you are using Typescript** you'll also need to setup the `baseUrl` and the `paths` in your `tsconfig`.  Most likely this is the first reason you've had to setup anything typescript so you'll need to create a `tsconfig.json` at the root of the project.

Here is the full file I use, change what you like but the key things related to these project alias
```json
{
    "compilerOptions": {
      "baseUrl": "src",
      "paths": {
          "@components/*": ["./components/*"],
          "@hooks/*": ["./hooks/*"]
      },
      "jsx": "preserve",
      "allowSyntheticDefaultImports": true,
      "strict": false,
      "moduleResolution": "node",
      "lib": ["esnext", "dom"],
      "module": "esnext",
      "target": "esnext",
      "skipLibCheck": true,
  }
}

```

1. Create a `tsconfig.json`
