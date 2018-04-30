/* jshint esversion: 6 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }] */

import React from "react"
import {render} from "react-dom"
import ReactMailForm from "./ReactMailForm"

render(<ReactMailForm formConfigurationURL="example/config.json" />, document.getElementById("root"))