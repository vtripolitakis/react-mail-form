/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div><h2>{this.props.formTitle}</h2></div>
    }
}

