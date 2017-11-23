const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const vnumLogic = require('../../logic/vnums.js');

const RoomMap = ({areaInfo, roomsData}) => {
    const vnum = vnumLogic.generator(areaInfo.minVnum);

    return <p>--- map here ---</p>
};

module.exports = RoomMap;