/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"
console.log("hello world")
export default class ReactMailForm extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>ALOHA {this.props.formName}</div>
    }
}

