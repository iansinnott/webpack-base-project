# Webpack Base Project

This is a learning project to get you set up and running Webpack. Unlike many Webpack tutorials we'll be starting from scratch and building up to a configuration that can bundle your React app to run in production.

## Learning from this project

1. Start from the basics

## Basics

Checkout the starting branch:

```
git checkout 1-basics
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
