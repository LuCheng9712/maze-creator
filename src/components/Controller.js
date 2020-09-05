import * as Constants from './constants'

class Controller {

    static canSetOrigin = true;
    static origin;
    static canSetTarget = true;
    static target;
    static cells = [];
    static grid = [];
    static curPath = [];

    static handleSelection = (cell) => {
        console.log("x: ", cell.x, "\ny: ", cell.y);
        if (this.canSetOrigin) {
            // if (this.origin !== null) {
            //     this.cells[this.origin.y][this.origin.x].reset();
            // }
            this.origin = {x: cell.x, y: cell.y};
            cell.type = Constants.cellTypes.ORIGIN;
            this.canSetOrigin = false;
            cell.setOrigin();
        } else if (this.canSetTarget) {
            // if (this.target !== null) {
            //     this.cells[this.origin.y][this.origin.x].reset();
            // }
            this.target = {x: cell.x, y: cell.y};
            cell.updateType(Constants.cellTypes.TARGET);
            this.canSetTarget = false;
        }
    }

    static toggleCanSetOrigin = () => {
        this.canSetOrigin = !this.canSetOrigin;
    }

    static toggleCanSetTarget = () => {
        this.canSetTarget = !this.canSetTarget;
    }

    static printGrid = (grid) => {
        let i;
        console.log("printing grid");
        for (i = 0; i < grid.length; i++) {
            let j;
            let str = "";
            for (j = 0; j < grid[i].length; j++) {
                str = str + grid[i][j].toString() + " ,";
            }
            console.log(str);
        }
    }

    static resetCells = () => {
        let i;
        for (i = 0; i < this.grid.length; i++) {
            let j;
            for (j = 0; j < this.grid[i].length; j++) {
                this.cells[i][j].reset();
            }
        }
        this.canSetOrigin = true;
        this.canSetTarget = true;
    }

    static calculateHValue = (cell) => {
        return Math.abs(cell.x - this.target.x) + Math.abs(cell.y - this.target.y);
    }

    static isValid = (y, x) => {
        return (x >= 0) && (y >= 0) && (x < Constants.gridCount) && (y < Constants.gridCount);
    }

    static tracePath = () => {
        console.log ("\nThe Path is ");
        let y = this.cells[this.target.y][this.target.x].parent.y;
        let x = this.cells[this.target.y][this.target.x].parent.x;

        let path = [];

        while (this.cells[y][x].parent.x !== x ||
                this.cells[y][x].parent.y !== y) {
            path.push({x: x, y: y});
            y = this.cells[y][x].parent.y;
            x = this.cells[y][x].parent.x;
        }

        this.curPath = path;
        while (path.length > 0) {
            let p = path.pop();
            this.cells[p.y][p.x].updateType(Constants.cellTypes.PATH);
        }

    }

    static findBestPathAStarSearch = () => {
        console.log("finding best path");
        if (this.origin == null || this.target == null) {
            return;
        }
        let openList = [];
        let closedGrid = [];
        let i;
        for (i = 0; i < this.grid.length; i++) {
            closedGrid.push([]);
            let j;
            for (j = 0; j < this.grid[i].length; j++) {
                closedGrid[i].push(1);
            }
        }
        openList.push(this.origin);
        while (openList.length > 0) {
            openList.sort((a, b) => b.f - a.f);
            let q = openList.pop();
            let successors = [];
            if (this.isValid(q.y - 1, q.x)) {
                successors.push(this.cells[q.y - 1][q.x]);
            }
            if (this.isValid(q.y + 1, q.x)) {
                successors.push(this.cells[q.y + 1][q.x]);
            }
            if (this.isValid(q.y, q.x - 1)) {
                successors.push(this.cells[q.y][q.x - 1]);
            }
            if (this.isValid(q.y, q.x + 1)) {
                successors.push(this.cells[q.y][q.x + 1]);
            }
            while (successors.length > 0) {
                let successor = successors.pop();
                let newG = this.cells[q.y][q.x].g + 1;
                let newH = this.calculateHValue(successor);
                let newF = newG + newH;
                if (successor.x === this.target.x && successor.y === this.target.y) {
                    successor.parent = {x: q.x, y: q.y};
                    successor.updateHFG(newH, newG, newF, {x: q.x, y: q.y});
                    this.cells[successor.y][successor.x] = successor;
                    this.tracePath();
                    return;
                } else if (closedGrid[successor.y][successor.x] &&
                    this.grid[successor.y][successor.x] &&
                    !openList.includes(successor)) {
                    successor.parent = {x: q.x, y: q.y};
                    successor.updateHFG(newH, newG, newF, {x: q.x, y: q.y});
                    openList.push(successor);
                    this.cells[successor.y][successor.x] = successor;
                } else if (closedGrid[successor.y][successor.x] &&
                    this.grid[successor.y][successor.x] &&
                    openList.includes(successor) &&
                    ((successor.f != null &&
                    newF < successor.f) || (successor.f == null))) {
                    successor.updateHFG(newH, newG, newF, {x: q.x, y: q.y});
                    this.cells[successor.y][successor.x] = successor;
                }
                closedGrid[q.y][q.x] = 0;
            }
        }
    }
}

export default Controller;