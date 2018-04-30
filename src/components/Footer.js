/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"

export default class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div><p>{this.props.footerText}</p></div>
    }
}

