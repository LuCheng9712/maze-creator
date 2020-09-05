import * as Constants from './constants'

export default class CellModel {
    x;
    y;
    type;
    h;
    f;
    g;
    parent;
    component;

    constructor(x, y, component) {
        this.x = x;
        this.y = y;
        this.component = component;
        this.h = null;
        this.f = null;
        this.g = null;
        this.parent = null;
        this.type = Constants.cellTypes.UNSELECTED;
    }

    setOrigin() {
        this.h = 0;
        this.g = 0;
        this.f = this.h + this.g;
        this.parent = {x: this.x, y: this.y};
        this.type = Constants.cellTypes.ORIGIN;
        this.component.setState({cellType: this.type});
    }

    reset() {
        this.h = null;
        this.f = null;
        this.g = null;
        this.parent = null;
        this.type = Constants.cellTypes.UNSELECTED;
        this.component.setState({cellType: this.type});
    }

    updateHFG(h, g, f, parent) {
        this.h = h;
        this.g = g;
        this.f = f;
        this.parent = parent;
    }

    updateType(type) {
        this.type = type;
        this.component.setState({cellType: type})
    }
}