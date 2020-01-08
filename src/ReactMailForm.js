/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"
require('es6-promise').polyfill()
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ButtonList from "./components/ButtonList"
import MainFormContent from "./components/MainFormContent"
import Notification from "./components/Notification"

export default class ReactMailForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataLoaded : false,
            notificationVisible: false,
            notificationClass: "",
            notificationText: "",
            formConfiguration: null
        }
        this._changeHandler = this._changeHandler.bind(this)
        this._submitHandler = this._submitHandler.bind(this)
    }
    
    _changeHandler(i,type, e){
        this.setState((previousState)=>{
            let newState = Object.assign({},previousState)
            switch(type){
            case "text":
                newState.content[i]=e
                break
            case "textarea":
                newState.content[i]=e
                break
            case "select":
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

    _submitHandler(e){
        /* start axios request to submit form data */
        e.preventDefault()
        e.stopPropagation()

        // perform some basic validation
        if (document.getElementById(this.state.formConfiguration.formID).reportValidity()){
            axios.post(
                this.state.formConfiguration.endpoint, 
                this.state.content, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response)=>{
                    // console.log(response.data)
                    this.setState((previousState)=>{
                        // console.log(previousState)
                        return {
                            notificationVisible: true,
                            notificationClass: previousState.formConfiguration.successMessageClass,
                            notificationText: previousState.formConfiguration.successMessage,
                        }
                    })
                    window.setTimeout(()=>{
                        this.setState(()=>{
                            return {
                                notificationVisible: false,
                                notificationClass: "",
                                notificationText: "",
                            }
                        })
                    },3500)
                })
                .catch((error)=>{
                    this.setState((previousState)=>{
                        // console.log(previousState)
                        return {
                            notificationVisible: true,
                            notificationClass: previousState.formConfiguration.errorMessageClass,
                            notificationText: previousState.formConfiguration.errorMessage,
                        }
                    })
                    window.setTimeout(()=>{
                        this.setState(()=>{
                            return {
                                notificationVisible: false,
                                notificationClass: "",
                                notificationText: "",
                            }
                        })
                    },3500)
                })
        }else{
            document.querySelectorAll(`#${this.state.formConfiguration.formID} :invalid`)
                .forEach((node)=>{
                    node.classList.add("invalidInputElement")
                })
            window.setTimeout(()=>{
                document.querySelectorAll(`#${this.state.formConfiguration.formID} :invalid`)
                    .forEach((node)=>{
                        node.classList.remove("invalidInputElement")
                    })
            },1000)    
        }
    }

    componentDidMount(){
        /* start axios request to load configuration */
        axios.get(this.props.formConfigurationURL)
            .then((response) => {
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
                            break
                        case "select":
                            content[c]=""
                            break                        
                        }                        
                    }
                })
                this.setState(()=>{
                    return {content:content}
                })
                this.setState(()=>{
                    return {dataLoaded: true,
                        formConfiguration: response.data}
                })                
            })
            .catch(function (error) {
                // console.log("ERROR", error)
            })
    }

    render(){
        let dataLoaded = this.state.dataLoaded
        if (dataLoaded){
            const {formTitle, footerText, content} = this.state.formConfiguration            
            return <div>
                <Header formTitle={formTitle}/>
                <MainFormContent content={content} formState={this.state.content} formID={this.state.formConfiguration.formID} changeHandler={this._changeHandler}/>
                <ButtonList submitHandler={this._submitHandler}/>
                <Notification 
                    visible={this.state.notificationVisible} 
                    notificationClasses={this.state.notificationClass} 
                    notificationText={this.state.notificationText}/>
                <Footer footerText={footerText} />                
            </div>
        }else{
            return <div>loading</div>
        }
    }
}