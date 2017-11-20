const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const Item = require('./Item');

const ItemList = ({itemsToList, itemsById}) => (
    <ul className="item-list">
        { itemsToList.map(itemId => <Item key={itemId} item={itemsById[itemId]}></Item>)}
    </ul>
);

module.exports = ItemList;