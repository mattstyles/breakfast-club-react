# Parkr

> Meeting room booking tool


## Getting Started

Once cloned and installed there is a handy start script to build the client and bootstrap the servers

```
npm run start
```

### Detailed Start Guide

The project contains 2 development servers, one for the API and one that simply serves the app.

You’ll need node installed on your machine, for a Mac the easiest way is probably to use [Homebrew](http://brew.sh/). Use `node -v` to check the version as the project requires 0.11.x or greater. If the version is less than 0.11 then you’ll need to either update your version to 0.12 or greater or install from the experimental branch, if this is the case then the start script included in the project will expect this to be installed via [node version manager](https://github.com/creationix/nvm), which is probably the easiest way. Follow instructions to install nvm and the install version 0.11.14.

```
nvm install 0.11.14
```

Newer versions from 0.11 should work but you’ll need to update the path in the `./bin/start` script to reflect where node is installed, you’ll need to do this anyway if you’ve setup nvm to install anywhere other than default.

With the correct version of node installed go ahead and use the start script to bootstrap the servers

```
npm run start
```

All should now be ready to rock.


## Watch all the things

Any changes to the servers will obviously require rebooting the server, just kill and use the start script again or there is a script to forego rebuilding the client:

```
npm run restart
```

For any client changes there is a watch script using [gulp](http://gulpjs.com/)

```
gulp watch
```

If you’ve got the live reload plugin installed in your browser then the browser will even automatically refresh when the build completes after a change!

[chrome livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
[firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/)

To specify a development build use `-d`

```
gulp watch -d
```


## Project Structure

As the project contains both client code as well as a dev version of the api server it’s worth detailing the structure.

`./lib`

Simple [koa](http://koajs.com/) dumb server for punting out the client app.

`./api`

[Koa](http://koajs.com/) server for the RESTful API endpoints.

`./public`

Gets served by the webserver and contains all the stuff required for the client app.

`./spec`

Contains tests that will autorun during the build. As the API detailed here is only for development the tests should only focus on the client code.

`./config`

Contains various configuration files to help bootstrapping the servers and running the build.

`./bin`

Contains a few helper scripts for bootstrapping.


### `./public` - client app

#### `./styles`

Follows sass convention from (the sass way)[http://thesassway.com/beginner/how-to-structure-a-sass-project] with one exception being where vendor files get installed, rather than inside the `styles` directory any vendor css files will go into the standard `./public/vendor` file along with other bower dependencies.

`./styles/modules`

All files here should not output CSS. i.e. mixins, functions, variables.

`./styles/partials`

Files that output CSS should go here and should follow [smacss](http://smacss.com/) guidelines for structure.

#### `./scripts/`

Scripts are built with [browserify](http://browserify.org/) so uses nodes commonjs module structure. They are also subject to a transform that will build [reacts](http://facebook.github.io/react/) jsx files into regular js, this process also gives access to a small subset of es6 code features that make life much more pleasant.

The structure in here loosely follows [flux](http://facebook.github.io/flux/) project structure, with the exception that the test suite is extracted to the `./spec` folder found at root. The folder names are self-explanatory.

#### `./assets`

Stuff like images, fonts, config files should go here.

#### `./vendor`

3rd party libraries installed via bower should live here. Note that where possible scripts should be installed via npm.


## Testing all the things

Unit tests will be conducted using [mocha](http://mochajs.org/) and [chai](http://chaijs.com/), using chai’s _should_ assertion style and mocha’s _tdd_ interface style.

All unit tests should be placed in the `./spec` directory.

Gulp has a test task that can be run by itself although will run when anything in the `./scripts` directory changes

```
gulp test
```

Failing tests will not currently kill the build so testing the code is still a manual task and probably will remain so until we hook up a CI process.
