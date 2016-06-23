# Webpack Base Project

This is a learning project to get you set up and running Webpack. Unlike many Webpack tutorials we'll be starting from scratch and building up to a configuration that can bundle your React app to run in production.

## Learning from this project

1. Start from the basics
2. Move on to a working configuration
2. Module bundling

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

Ah crap, still failing. But we haven't installed webpack yet so that makes sense. Let's install it and save it to package.json:

```
npm install --save-dev wepback
```

Now let's run our command again.

```
npm run build
```

It should fail again but you should see a long list of webpack options in the console. At the end of the output there should be a line that reads:

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

## A working configuration

```
git checkout 2-a-working-configuration
```

Now that we have the basic ingredients we need to run Webpack, it's time to put it into use. Let's flesh out our `webpack.config.js` with an entry and output:


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

### [1]

The entry point. Every bundled application will have an entry point. The file at the root of your app's dependency tree.

**NOTE:** Make sure you make this path relative, otherwise webpack will complain that it cannot find it.

### [2]

The output. The `output` key configures how webpack will output your bundle. The base options are the ones show above: the `path` and `filename`.

### [3]

The `path` configures where exactly on the filesystem we want webpack to output our bundle. This will vary depending on your project. In this example we're using the output directory named `dist/`.

**NOTE:** If you have not yet created a `dist/` directory do not worry, webpack will create it for you.

### [4]

Finally we configure what webpack should name the bundled JS file it outputs. Name this whatever you like. In this example, we are using `bundle.js`.

Whew, we now have a working webpack configuration. Then `entry` and `output` options are the base options needed to run webpack. That's it!

**NOTE:** However, as we'll see soon, this isn't necessarily very useful yet, so we will be adding more configuration later.

Even though our webpack config is valid, it's pointing to a non-existant index.js file. Now let's create that `index.js` file so that we actually have something for Webpack to build:

```js
// index.js
const add = (a, b) => {
  return a + b;
};
console.log(add(1, 2));
```

This is a very simple script which defines an `add` function and calls it once, passing 1 and 2 as arguments. The expected output of running this file would be the number 3.

Now run webpack again:

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

Congrats! Webpack has successfully built your bundle. Let's take a look at exactly what webpack generated. Open up `dist/bundle.js`:

```js
/******/ (function(modules) { // webpackBootstrap
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

At first glance it would seem that webpack merely added a bunch of unecessary code to our JS and spit it out. However we haven't yet used webpack for it's core purpose, which is moduel bundling. We'll get into that in the next exercise.

**NOTE:** Since the `dist/` directory will only contain compiled files you will likely want to ignore it in `.gitignore` so it doesn't cause unnecessary merge conflicts.

## Module Bundling

That last section got webpack working, but it wasn't doing much. Let's create a real bundle. Create an `add.js` file in the same directory as `index.js`:

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

As you know, browsers do not have a native `require` function that is capable of resolving modules. This is why we need a bundler like webpack to help us out. Let's run our build and:

```
npm run build
```

Let's take a look at our newly generated `dist/bundle.js`:

**NOTE: We've omitted the top part of the file because it has not changed. The interesting part of the file is near the bottom.

```js
// Webpack require code omitted...

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

[Webpack Configuration]: https://webpack.github.io/docs/configuration.html
