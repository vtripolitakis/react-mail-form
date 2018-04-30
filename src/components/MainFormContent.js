/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"

export default class MainFormContent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let formData = null
        formData = Object.keys(this.props.content).map(i=>{
            console.log(this.props.content[i]["type"], this.props.content[i]["maxwidth"])
            return <div key={i}>{i}: <input type={this.props.content[i]["type"]} width={this.props.content[i]["maxwidth"]} /></div>
        })
        return <div>
            <form>
                {formData}
            </form>
        </div>
    }
}

