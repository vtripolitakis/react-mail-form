/* jshint esversion: 6 */
/* global formConfigurationURL */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */
import "@babel/polyfill"
import React from "react"
import {render} from "react-dom"
import ReactMailForm from "./ReactMailForm"

// Polyfill for reportValidity for IE
/* Copyright (c) 2016 Tobias Buschor https://goo.gl/gl0mbf | MIT License https://goo.gl/HgajeK */

if (!HTMLFormElement.prototype.reportValidity) {
    HTMLFormElement.prototype.reportValidity = function() {
        if (this.checkValidity()) return true
        var btn = document.createElement("button")
        this.appendChild(btn)
        btn.click()
        this.removeChild(btn)
        return false
    }
}

if (typeof formConfigurationURL!=="undefined"){
    render(<ReactMailForm formConfigurationURL={formConfigurationURL} />, document.getElementById("root"))
}else{
    render(<ReactMailForm formConfigurationURL="example/config.json" />, document.getElementById("root"))
}

