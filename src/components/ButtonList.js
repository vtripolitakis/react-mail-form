/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"

export default class ButtonList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            <button type="button" className="btn btn-default" onClick={this.props.submitHandler}>Submit</button> &nbsp;
            <button type="button" className="btn btn-cancel">Cancel</button>
        </div>
    }
}

