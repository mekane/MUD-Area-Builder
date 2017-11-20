const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly

const Item = ({item}) => (
    <li className="item-list__item">
        { item.text }
    </li>
);

module.exports = Item;