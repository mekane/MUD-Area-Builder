
const defaultState = () => {
    return {
        name: '',
        fileName: '',
        minLevel: 0,
        maxLevel: 75,
        authorName: '',
        minVnum: 0,
        maxVnum: 99
    };
};

const areaStateReducer = (state = defaultState(), action = {type: null}) => {
    switch (action.type) {
        case 'SET_AREA_INFO':
            return Object.assign(defaultState(), action.areaInfo);
            break;
        default:
            return state;
    }
};

module.exports = areaStateReducer;