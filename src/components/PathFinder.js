import React from 'react';
import './Header.scss'
import Grid from "./Grid";
import * as Constants from './constants'
import Header from './Header'

class PathFinder extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pf_parent">
                <Header/>
                <Grid height={Constants.gridHeight}/>
            </div>
        )
    }

}

export default PathFinder;
