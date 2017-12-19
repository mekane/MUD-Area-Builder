# Area Builder for ROM-based MUDs

This is a web app aimed at providing a streamlined interface for area authors to generate simple area files quickly

## Getting Started

At the moment all it needs is an `npm install`. 

The project uses Grunt as the build tool, so you may want to install it globally (`npm install -g Grunt`), otherwise you can run it out of the npm directory (`./node_modules/.bin/grunt <task>`)

See `grunt -h` for available tasks. The important ones are:

   * `grunt test` - runs the unit tests, telling mocha to pipe the source through Babel. This is necessary once any source or test code has ES6 features that Node doesn't support.
   * `grunt build` - transpiles source, builds stylus, and puts all output in *build/*
   * `grunt server` - starts a development web server using *build/* as its web root, and keeps a watcher running that re-runs build if any of the source files change. 

## TODO List

   * Mapper - deal with rooms that are not connected (either ignore them when drawing or give them reasonable default coordinates)
   * Stateful Room form component that keeps internal track of whether the room had exits or not
   * Stateful Map component(?) that keeps track of which room is selected. This could also be internal editor state that is passed down into the components. Knows if room form is showing or not.
   * edit room popup on room click
   * auto-show edit room for new room when clicking hover arrow
   * detect adjacent rooms when adding new rooms and auto-connect them to keep a normal structure
   * size the room-map to fit all the rooms, make its container scroll: auto
   * translate the whole room-map so negative indices are positive
   * draw prettier exit and "add" arrow
   * 
   * Add 'Undo'
   * 
   * save state to local storage
   * export to area file text
   * parse area file and load