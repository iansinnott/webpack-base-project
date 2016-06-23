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
