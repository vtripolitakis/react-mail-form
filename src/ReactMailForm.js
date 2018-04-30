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
    }

    componentDidMount(){
        console.log("component mounting - receiving configuration")
        /* start axios request to load configuration */
        let that = this
        axios.get(this.props.formConfigurationURL)
            .then(function (response) {
                console.log("SUCCESS", response)
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
                <MainFormContent content={content}/>
                <ButtonList />
                <Footer footerText={footerText} />                
            </div>
        }else{
            return <div>loading</div>
        }
    }
}