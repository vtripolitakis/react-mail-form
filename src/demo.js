/* jshint esversion: 6 */
/* global formConfigurationURL */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"
import {render} from "react-dom"
import ReactMailForm from "./ReactMailForm"

if (typeof formConfigurationURL!=="undefined"){
    render(<ReactMailForm formConfigurationURL={formConfigurationURL} />, document.getElementById("root"))
}else{
    render(<ReactMailForm formConfigurationURL="example/config.json" />, document.getElementById("root"))
}

