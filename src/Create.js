import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Create extends Component {
  render() {
    return(
      <div>
        <input type="textbox"/>
        <input type="textbox"/>
        <input type="textbox"/>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    )
  }
}
export default Create
