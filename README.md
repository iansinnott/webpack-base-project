# Webpack Base Project

This is a learning project to get you set up and running Webpack. Unlike many Webpack tutorials we'll be starting from scratch and building up to a configuration that can bundle your React app to run in production.

## Learning from this project

This project is meant to be interactive. If you don't yet know Webpack but you would like to learn I suggest working through this tutorial instead of simply reading through it. I would recommend viewing the [README on the `master` branch on GitHub](https://github.com/iansinnott/webpack-base-project) while you work through it. Then you can check out the various tags locally.

To get started, clone this repo and then check out the first tag:

```
git checkout 1-beginner
```

Then work through this document.

## Table of contents

1. [Start from the basics](#basics)
2. [Move on to a working configuration](#a-working-configuration)
3. [Module bundling](#module-bundling)
4. [Loaders](#loaders)
5. [React](#react)
6. [Production Tooling](#production-tooling)

## Basics

Checkout the starting branch:

```
git checkout 1-beginner
```

Now build the project:

```
npm run build
```

**Shit**, that didn't work... Let's check out our build script to see what happened. Open `package.json` and check out line 7.

```
"build": "echo \"Error: no build script specified\" && exit 1"
```

Ah, ok. That makes sense. Let's change this line to run Webpack.

```
"build": "webpack"
```

A quick intro to Webpack:

* **It's a module bundler.** If you write code that `require`s or `import`s from other files you will need a bundler because not all browsers support this functionality as of 2016.
* **It can bundle, transpile and minify your code.** That means it can do a lot, if not all, of the things you would normally want to do with a dev and production codebase.
* **It does a lot.** Webpack is a complex and powerful piece of software. There's a lot more it can do that will not be covered here, but this should be enough to get you set up.

Now let's run our build script again:

```
npm run build
```

Ah crap, still failing. But we haven't installed Webpack yet so that makes sense. Let's install it and save it to package.json:

```
npm install --save-dev wepback
```

Now let's run our build command again.

```
npm run build
```

It should fail again but you should see a long list of Webpack options in the console. At the end of the output there should be a line that reads:

```
Output filename not configured.
```

If that's the case then great! Webpack is running as expected. It's telling us it can't find a config file, which is exactly what we'd expect since we haven't created one. Let's do that now.

```
touch webpack.config.js
```

Now add the following to your newly created webpack.config.js:

```js
// webpack.config.js

module.exports = {
  // Config will go here...
};
```

That's it! You're done with section one. You've created the skeleton for a working Webpack config. Now let's make it work...

## A working configuration

Now that we have the basic ingredients we need to run Webpack, it's time to put it into use. Let's flesh out our `Webpack.config.js` with an entry and output:


```js
// webpack.config.js

module.exports = {

  entry: './index.js', // [1]

  output: { // [2]
    path: './dist', // [3]
    filename: 'bundle.js', // [4]
  },

};
```

Let's go through this line by line:

#### [1]

The entry point. Every bundled application will have an entry point. The file at the root of your app's dependency tree.

**NOTE:** Make sure you make this path relative, otherwise Webpack will complain that it cannot find it.

#### [2]

The output. The `output` key configures how Webpack will output your bundle. The base options are the ones show above: the `path` and `filename`.

#### [3]

The `path` configures where exactly on the filesystem we want Webpack to output our bundle. This will vary depending on your project. In this example we're using the output directory named `dist/`.

**NOTE:** If you have not yet created a `dist/` directory do not worry, Webpack will create it for you.

#### [4]

Finally we configure what Webpack should name the bundled JS file it outputs. Name this whatever you like. In this example, we are using `bundle.js`.

Whew, we now have a working Webpack configuration. Then `entry` and `output` options are the base options needed to run Webpack. That's it!

**NOTE:** However, as we'll see soon, this isn't necessarily very useful yet, so we will be adding more configuration later.

Even though our Webpack config is valid, it's pointing to a non-existent index.js file. Now let's create that `index.js` file so that we actually have something for Webpack to build:

```js
// index.js
const add = (a, b) => {
  return a + b;
};
console.log(add(1, 2));
```

This is a very simple script which defines an `add` function and calls it once, passing 1 and 2 as arguments. The expected output of running this file would be the number 3.

Now run Webpack again:

```
npm run build
```

You should see something like this:

```
Hash: c22f911cc4c3bbb013a3
Version: webpack 1.13.1
Time: 49ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.46 kB       0  [emitted]  main
   [0] ./index.js 67 bytes {0} [built]
```

Congrats! Webpack has successfully built your bundle. Let's take a look at exactly what Webpack generated. Open up `dist/bundle.js`:

```js
/******/ (function(modules) { // WebpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	const add = (a, b) => {
	  return a + b;
	};
	console.log(add(1, 2));


/***/ }
/******/ ]);
```

Whoa, there's a lot going on here, and we're not going to get into most of it. But look near the very end of the file and you will see the contents of our `index.js` file.

To make sure the bundle actually works as expected, run it through node. It should output 3 on the console:

```
node dist/bundle.js
```

At first glance it would seem that Webpack merely added a bunch of unecessary code to our JS and spit it out. However we haven't yet used Webpack for it's core purpose, which is moduel bundling. We'll get into that in the next exercise.

**NOTE:** Since the `dist/` directory will only contain compiled files you will likely want to ignore it in `.gitignore` so it doesn't cause unnecessary merge conflicts.

## Module Bundling

That last section got Webpack working, but it wasn't doing much. Let's create a real bundle. Create an `add.js` file in the same directory as `index.js`:

```js
// add.js
module.exports = (a, b) => {
  return a + b;
};
```

Let's also refactor index.js so that it requires from app.js:

```js
// index.js
const add = require('./add.js');
console.log(add(1, 2));
```

As you know, browsers do not have a native `require` function that is capable of resolving modules. This is why we need a bundler like Webpack to help us out. Let's run our build and:

```
npm run build
```

Let's take a look at our newly generated `dist/bundle.js`:

**NOTE:** We've omitted the top part of the file because it has not changed. The interesting part of the file is near the bottom.

```js
// Webpack boilerplate code omitted...

/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// index.js
	const add = __webpack_require__(1);
	console.log(add(1, 2));


/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = (a, b) => {
    return a + b;
  };


/***/ }
/******/ ]);
```

Now run this bundle to make sure it works as expected:

```
node dist/bundle.js
```

Did you get `3` in the console? Boom! Now you have a bundle that can be run in browsers. It's one file that can be loaded in one requst, but you can now separate all your code into separate files as you see fit. Webpack will handle the rest.

## Loaders

Now we have a working Webpack configuration that is bundling our modules into one JS file that can be cansumed by browsers... but can it _really_?

Take a look at our add functon from above:

```js
module.exports = (a, b) => {
  return a + b;
};
```

Our code uses an ES6 arrow function, which is not compatible with many browsers currently in the wild. ES6 is great, but it doesn't work everywhere. To make sure our code runs in older browsers we'll need to transpile our code. Enter Babel.

### Babel

Quick Babel intro:

* **Babel turns ES6 code into ES5 code.** That means you can write super nifty next-gen JS and transpile it into javascript that will run in every browser.
* **Babel can also transform React's JSX syntax** into valid javascript. More on this later.

Let's install Babel so we can use it:

```
npm install --save-dev babel-cli babel-core
```

Now that we have Babel and the Babel CLI installed we can run it directly. This command will transpile our two JS files and place them in the same `dist/` directory we've been using:

```
./node_modules/.bin/babel --out-dir dist index.js add.js
```

Now if you look at `dist/index.js` and `dist/add.js` you will see that Babel did... _absolutely nothing!_ Fun, right?

Let's configure Babel so it does something. By default Babel doesn't do any transpilation. To make it work we need to add the ES2015 preset.

```
npm install --save-dev babel-preset-es2015
```

Now we'll want to create a `.babelrc` file to configure babel:

```
echo '{ "presets": ["es2015"] }' > .babelrc
```

This basic configuration tells Babel we want to compile ES6 / ES2015 code to ES5. Let's run our Babel script again and see what the output looks like:

```
./node_modules/.bin/babel --out-dir dist index.js add.js
```

```js
// dist/add.js
"use strict";

module.exports = function (a, b) {
  return a + b;
};
```

```js
// index.js
'use strict';

var add = require('./add.js');
console.log(add(1, 2));
```

As you can see, Babel as transpiled our ES6 code and also added `'use strict';` to each file. Nice! This is a big improvement. However, you may notice that we're not bundling these files anymore. We've stopped using Webpack entirely. Let's see how we can bring Webpack back into the picture.

### Webpack Loaders

Whew, now we can get on to the main event of this section: Webpack loaders. Webpack loaders are a feature of Webpack which allows you perform operations on source files as they are being bundled. In our case, we want to run our source files through Babel before bundling them. This is simple enough to configure in Webpack.

However, before we move on lets first move our `index.js` and `app.js` files into their own directory where all our source files will live:

```
mkdir src
mv index.js src/index.js
mv add.js src/add.js
```

Now we'll need to update our `config.webpack.js` file to look like this:

```js
// webpack.config.js
const path = require('path'); // NOTE: We require path because we use it below

module.exports = {

  entry: './src/index.js', // IMPORTANT: We changed the path to match our new index.js location

  output: {
    path: './dist',
    filename: 'bundle.js',
  },

  module: {
    loaders: [ // [1]
      {
        test: /\.js$/, // [2]
        loaders: ['babel'], // [3]
        include: path.join(__dirname, 'src'), // [4]
      },
    ],
  },

};
```

Again, let's step through this one line at a time:

#### [1]

In a Webpack config `module.loaders` defines an array of loaders to be run on your source files. This can contain any number of loaders including things like bable, TypeScript, CoffeScript, CSS preprocessors, image processors, etc. Loaders are one of Webpacks most commonly-used features and they are quite powerful.

#### [2]

Each loader configuration object you define in `module.loaders` will have a `test` option that let's you specify a regex to be used when matchin source files. In our case, we're telling Webpack we want it to match every file that ends with `.js`.

#### [3]

So what does it mean when Webpack matches a file based on the `test` option? It means it will run it through the loader you specify here. In this case, we want it to run the files through the Babel loader.

**IMPORTANT:** You will need to npm install the appropriate loader for every loader you put into your Webpack config. Let's do that for Babel now if you haven't already. Loaders are generally named with the `-loader` suffix:

```
npm install --save-dev babel-loader
```

#### [4]

This line instructs Webpack to only run this loader on files within `src/`. This is important because we don't want Babel to run on modules we import from `node_modules`.

### Run the build again

**NOTE:** If you missed it in the instructions above you need to have babel-loader installed for this to work:

```
npm install --save-dev babel-loader
```

Run the Webpack build again:

```
npm run build
```

And check out the output in `dist/bundle.js`. As before, I've omitted the Webpack boilerplate that comes in every module bundle:

```js
// Webpack boilerplate code omitted...

/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// index.js
	var add = __webpack_require__(1);
	console.log(add(1, 2));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (a, b) {
	  return a + b;
	};

/***/ }
/******/ ]);
```

Look at that! Babel has been run on our source files. You now have a complete Webpack config for transpiling **AND** bundling your code.

## React

Now that we have transpilation and bundling set up, it's time to get serious. We want to build a react app, so we will need to be able to transpile JSX code. Luckily, Babel can do this for us:

```
npm install --save-dev babel-preset-react
```

To configure Babel to use this preset update your `.babelrc` to add the React preset we just installed:

```js
{ "presets": ["es2015", "react"] }
```

Now let's update our source code to be a React app. We'll create a new App.js file to hold our root component:

```js
// App.js
import React from 'react';

export class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <h1>I am the App</h1>
      </div>
    );
  }
}
```

And we'll update our index.js file to render the React component we created in App.js:

```js
// index.js
import React from 'react';
import { render } from 'react-dom';

import { App } from './App.js';

render(<App />, document.getElementById('root'));
```

Before we run our bundle, we need to be sure to install the dependencies we've added in our source, namely `react` and `react-dom`:

```
npm install --save react react-dom
```

Now run the build again:

```
npm run build
```

I won't show the resulting `bundle.js` here because it includes all of React's unminified source, but feel free to give it a look if you're interested. What's important is that we now have a bundle that we could run in a browser. To test it out, create a simple index.html file at `dist/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My react app</title>
  </head>
  <body>
    <div id='root'></div>
    <script src='./bundle.js'></script>
  </body>
</html>
```

Now run a web server at dist. There are many ways to run a web server but a simple one is to install the `http-server` global npm module:

```
npm install -g http-server
```

Now run the server with `dist/` as the root:

```
http-server dist
```

If you go to <http://localhost:8080> in your browser you should see the bundled app running.

## Production Tooling

There are many ways you can optimize your build for production, but the most common one is to minify it. In fact, it's so common that Webpack comes with support for minification _out of the box_. Let's look at how we can configure our build to be minified.

First off, let's copy our existing Webpack config:

```
cp webpack.config.js webpack.config.prod.js
```

Now let's edit this newly created file. We're going to add a new section: `plugins`.

```js
const path = require('path');
const webpack = require('webpack'); // IMPORTANT: Don't forget to include webpack

module.exports = {

  entry: './src/index.js',

  output: {
    path: './dist',
    filename: 'bundle.min.js', // IMPORTANT: We've renamed our minified bundle
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },

  plugins: [ // [1]
    new webpack.optimize.UglifyJsPlugin({ // [2]
      screw_ie8: true, // This line speaks for itself...
      compressor: {
        warnings: false,
      },
    }),
  ],

};
```

#### [1]

In a Webpack config `plugins` is an array of plugin instances you can provide. Plugins can be even more powerful than loaders and can do all sorts of things with your code. This also happens to be where you configure most of Webpacks optimizations.

#### [2]

Here we actually pass in an instance of `webpack.optimize.UglifyJsPlugin`. Don't worry about the configuration object for now. Just know that this configuration will nicely minify your code after it is bundled, giving you a nice production bundle to be deployed.

### Adding the build script

The final step is to add a script to run our build in production mode. To do this we simply pass the `--config webpack.config.prod.js` flag to Webpack. Since that's a lot to type out every time you want to run a build we'll add another NPM script to do the job. Add the following line to the `scripts` section of your `package.json`:

```
"build:prod": "webpack --config webpack.config.prod.js"
```

Now you can run the production build with the command:

```
npm run build:prod
```

## Conclusion

Webpack is a beast and can do a lot of things. It's also extensible through loaders and plugins, which means there's a thriving ecosystem of community-maintained extensions for Webpack. And if you can't find the right loader or plugin in existence already you can always write your own.

[Webpack Configuration]: https://webpack.github.io/docs/configuration.html
