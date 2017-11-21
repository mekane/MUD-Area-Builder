const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly

const AreaInfoForm = ({areaInfo}) => {
    let areaNameInput = null;
    let fileNameInput = null;
    let minLevelInput = null;
    let maxLevelInput = null;
    let authorNameInput = null;
    let minVnumInput = null;
    let maxVnumInput = null;

    function getAreaInfo() {
        return {
            name: areaNameInput.value,
            fileName: fileNameInput.value,
            minLevel: minLevelInput.value,
            maxLevel: maxLevelInput.value,
            authorName: authorNameInput.value,
            minVnum: minVnumInput.value,
            maxVnum: maxVnumInput.value
        }
    }

    function updateInfo() {
        app.store.dispatch(app.actions.setAreaInfo(getAreaInfo()));
    }

    return (
        <form className="area-info-form">
            <label className="area-info-form__label">
                Area Name:
                <input className="area-info-form__area-name" type="text" ref={(input) => areaNameInput = input} defaultValue={areaInfo.name} />
            </label>

            <label className="area-info-form__label">
                File Name:
                <input className="area-info-form__file-name" type="text" ref={(input) => fileNameInput = input} defaultValue={areaInfo.fileName} />
            </label>

            <label className="area-info-form__label">
                Minimum Level:
                <input className="area-info-form__min-level" type="number" ref={(input) => minLevelInput = input} defaultValue={areaInfo.minLevel} />
            </label>

            <label className="area-info-form__label">
                Maximum Level:
                <input className="area-info-form__max-level" type="number" ref={(input) => maxLevelInput = input} defaultValue={areaInfo.maxLevel} />
            </label>

            <label className="area-info-form__label">
                Author Name:
                <input className="area-info-form__author-name" type="text" ref={(input) => authorNameInput = input} defaultValue={areaInfo.authorName} />
            </label>

            <label className="area-info-form__label">
                Minimum Level:
                <input className="area-info-form__min-level" type="number" ref={(input) => minVnumInput = input} defaultValue={areaInfo.minVnum} />
            </label>

            <label className="area-info-form__label">
                Maximum Level:
                <input className="area-info-form__max-level" type="number" ref={(input) => maxVnumInput = input} defaultValue={areaInfo.maxVnum} />
            </label>

            <button type="button" className="area-info-form__update" onClick={updateInfo}>Update</button>
        </form>
    );
};

module.exports = AreaInfoForm;