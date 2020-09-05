import React from 'react';
import './Grid.scss'
import * as Constants from './constants'
import Controller from "./Controller";
import CellModel from "./Models";

class Grid extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    createGrid() {
        let i;
        let cells = [];
        for (i = 0; i < Constants.gridCount; i++) {
            cells.push(<Row width={Constants.gridWidth} index={i} key = {i}/>);
        }
        return cells;
    }

    render() {
        return (
            <div className="pf_grid">
                {this.createGrid()}
            </div>
        )
    }

}

class Row extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        if (Controller.cells.length > this.props.index) {
            Controller.cells.pop();
        }
        if (Controller.grid.length > this.props.index) {
            Controller.grid.pop();
        }
        Controller.cells.push([]);
        Controller.grid.push([]);
    }

    createRow() {
        let i;
        let cells = [];
        for (i = 0; i < Constants.gridCount; i++) {
            cells.push(<Cell x={i} y={this.props.index} key={i}/>);
        }
        return cells;
    }

    render() {
        return (
            <div className="pf_row">
                {this.createRow()}
            </div>
        )
    }
}

class Cell extends React.Component{

    cellType;
    cellData;

    constructor(props) {
        super(props);
        this.state = {cellType: "pf_cell_unselected"};
        this.cellData = new CellModel(this.props.x, this.props.y, this);
        if (Controller.cells[Controller.cells.length - 1].length > this.props.x) {
            Controller.cells[Controller.grid.length - 1].pop();
        }
        if (Controller.grid[Controller.grid.length - 1].length > this.props.x) {
            Controller.grid[Controller.grid.length - 1].pop();
        }
        Controller.cells[Controller.cells.length - 1].push(this.cellData);
        Controller.grid[Controller.grid.length - 1].push(1);
    }

    updateType() {
        Controller.handleSelection(this.cellData);
    }

    render() {
        return (
            <div
                className={`pf_cell ${this.state.cellType}`}
                onClick={() => this.updateType()}>
            </div>
        )
    }
}

export default Grid;