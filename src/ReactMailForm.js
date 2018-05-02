/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ButtonList from "./components/ButtonList"
import MainFormContent from "./components/MainFormContent"

export default class ReactMailForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataLoaded : false,
            formConfiguration: null
        }
        this._changeHandler = this._changeHandler.bind(this)
    }
    
    _changeHandler(i,type, e){
        console.log(i,type, e)
        this.setState((previousState)=>{
            let newState = Object.assign({},previousState)
            switch(type){
            case "text":
                newState.content[i]=e
                break
            case "textarea":
                newState.content[i]=e
                break
            case "checkbox_array":
                //check if it exists and delete otherwise add
                var idx = newState.content[i].indexOf(e)
                if (idx > -1){
                    newState.content[i].splice(idx,1)
                }else{
                    newState.content[i].push(e)    
                } 
            }

            
            return newState
        })
    }

    componentDidMount(){
        console.log("component mounting - receiving configuration")
        /* start axios request to load configuration */
        let that = this
        axios.get(this.props.formConfigurationURL)
            .then(function (response) {
                console.log("SUCCESS", response)
                // get all fields and add their default data
                let content = {}
                Object.keys(response.data.content).map(c=>{
                    if (typeof(response.data.content[c].default)!=="undefined"){
                        content[c]=response.data.content[c].default                        
                    }else{
                        //ToDo: check type and update accordingly
                        switch(response.data.content[c].type){
                        case "text":
                            content[c]=""
                            break
                        case "textarea":
                            content[c]=""
                            break
                        case "checkbox_array":
                            //check if it exists and delete otherwise add
                            content[c]=[]
                        }                        
                    }
                })
                that.setState(()=>{
                    return {content:content}
                })
                that.setState(()=>{
                    return {dataLoaded: true,
                        formConfiguration: response.data}
                })                
            })
            .catch(function (error) {
                console.log("ERROR", error)
            })
    }

    render(){
        let dataLoaded = this.state.dataLoaded
        if (dataLoaded){
            const {formTitle, footerText, content} = this.state.formConfiguration            
            return <div>
                <Header formTitle={formTitle}/>
                <MainFormContent content={content} formState={this.state.content} changeHandler={this._changeHandler}/>
                <ButtonList />
                <Footer footerText={footerText} />                
            </div>
        }else{
            return <div>loading</div>
        }
    }
}