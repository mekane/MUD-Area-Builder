# Redux Test App

This code base is a sandbox to try out writing a reducer and app structure using the Redux library with React.

## Motivation

This is a useful exercise to me because I watched the Redux videos and wrote a few small apps using my own implementation of the Redux / Flux architecture. So I understand the concept quite well, but not how to use the actual Redux library or how to scale it up from the toy apps I made.

I used TDD to build the reducer, to make sure my state transitions are sensible. I consider that to be the foundation of good practice. I am also curious to see how I naturally break apart reducers and actions as an app grows, and compare that to other examples.

I also then plan to use this as a boilerplate for other apps, since it will have the app structure and task runner all set up.

## Getting Started

At the moment all it needs is an `npm install`. 

The project uses Grunt as the build tool, so you may want to install it globally (`npm install -g Grunt`), otherwise you can run it out of the npm directory (`./node_modules/.bin/grunt <task>`)

See `grunt -h` for available tasks. The important ones are:

   * `grunt test` - runs the unit tests, telling mocha to pipe the source through Babel. This is necessary once any source or test code has ES6 features that Node doesn't support.
   * `grunt build` - transpiles source, builds stylus, and puts all output in *build/*
   * `grunt server` - starts a development web server using *build/* as its web root, and keeps a watcher running that re-runs build if any of the source files change. 

## Next Steps

   * Add edit, save, and delete actions to the system. Use TDD and then think about how to break down the reducer. Maybe figure out how to structure it for use with combineReducers()  
   * Replace hand-coded container components and redux subscribing with components generated using `react-redux` `connect()`. See http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
   * React routing and multiple screens?
