import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import Controller from "./Controller";
import * as Constants from './constants'

class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSearchClick = () => {
        Controller.findBestPathAStarSearch();
    }

    handleResetClick =() => {
        Controller.resetCells();
    }

    handleSelectCells = (type) => {
        switch (type) {
            case Constants.cellTypes.ORIGIN:
                Controller.toggleCanSetOrigin();
                break;
            case Constants.cellTypes.TARGET:
                Controller.toggleCanSetTarget();
                break;
            case Constants.cellTypes.WALL:
                break;
            case Constants.cellTypes.ROAD:
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Maze</Navbar.Brand>
                <Nav className="pf_nav">
                    <Nav.Link href="#start"
                              className={"pf_nav_link"}
                              onClick={() => this.handleSelectCells(Constants.cellTypes.ORIGIN)}>Start</Nav.Link>
                    <Nav.Link href="#target" className={"pf_nav_link"}
                              onClick={() => this.handleSelectCells(Constants.cellTypes.TARGET)}>Target</Nav.Link>
                    <Nav.Link href="#walls" className={"pf_nav_link"}
                              onClick={() => this.handleSelectCells(Constants.cellTypes.WALL)}>Walls</Nav.Link>
                    <Nav.Link href="#roads" className={"pf_nav_link"}
                              onClick={() => this.handleSelectCells(Constants.cellTypes.ROAD)}>Roads</Nav.Link>
                </Nav>
                <div className="pf_nav_button_group">
                    <Button variant="outline-info"
                            className={"pf_nav_button_reset"}
                            onClick={() => this.handleResetClick()}>Reset</Button>
                    <Button variant="outline-danger"
                            className={"pf_nav_button_path"}
                            onClick={() => this.handleSearchClick()}>Find Best Path</Button>
                </div>
            </Navbar>
        )
    }
}

export default Header;