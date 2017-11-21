const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const AreaInfoForm = require('./forms/AreaInfoForm.js');

const App = ({state}) => (
    <div className="app">
        <AreaInfoForm areaInfo={state.areaInfo}></AreaInfoForm>
        <pre>
            { console.log(state)  }
        </pre>
    </div>
);

module.exports = App;