/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"

export default class Notification extends React.Component{
    constructor(props){
        super(props)        
    }

    render(){
        // console.log(this.props)
        if (!this.props.visible){
            return null
        }
        return <div className={this.props.notificationClasses}>
            <strong>{this.props.notificationText}</strong>
        </div>
    }
}

