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
            let objectData = this.props.content[i]
            let outData = null
            switch(objectData["type"]){
            case "checkbox_array":
                var checkbox_array_data = objectData.options.map(j=>{
                    var isChecked = false
                    if (this.props.formState[i].indexOf(j)>-1){
                        isChecked = true
                    }
                    return <div key={j} className="col-md-4"><input type="checkbox" name={i+"[]"} value={j}
                        defaultChecked={isChecked}
                        onChange={e=>{
                            this.props.changeHandler(i, "checkbox_array", e.target.value)}}/> {j}
                    </div>
                })
                outData = <div id={i}>{checkbox_array_data}</div>
                break
            case "textarea":
                outData = <div id={i}><textarea rows={objectData["rows"]} cols={objectData["cols"]} 
                    defaultValue={this.props.formState[i]}
                    onChange={e=>{
                        e.preventDefault()
                        e.stopPropagation()
                        this.props.changeHandler(i,"textarea", e.target.value)}} />
                </div> 
                break
            case "text":
                outData = <div id={i} ><input type={objectData["type"]} width={objectData["maxwidth"]} 
                    defaultValue={this.props.formState[i]}
                    onChange={e=>{
                        e.preventDefault()
                        e.stopPropagation()
                        this.props.changeHandler(i,"text", e.target.value)}} />
                </div>                
                break
            }
            return <div key={i} className={"form-group " + `col-md-${objectData["btcolumns"]}`}>
                <label htmlFor={i}>{i}</label>
                {outData}
            </div>
        })
        return <div>
            <form>
                {formData}
            </form>
        </div>
    }
}

