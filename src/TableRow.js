import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class TableRow extends Component {

  constructor(props) {
    super(props)
    this.state={
      Editing:false,
      Deleted:false
    }
    this.toggleEditing = this.toggleEditing.bind(this)
  }

  toggleEditing() {
    let Editing = !this.state.Editing
    this.setState(
      {Editing: Editing}
    )
  }

  render() {
    const user = this.props.user
    let Editing = this.state.Editing
    if (Editing) {
      return (
        <tr>
          <td>{user.Name}</td>
          <td>{user.Age}</td>
          <td>{user.Nickname}</td>
          <td>
            <button onClick={this.toggleEditing}>Done</button>
            <button>Delete</button>
          </td>
        </tr>
      )
    }
    else {
      return (
        <tr>
          <td>{user.Name}</td>
          <td>{user.Age}</td>
          <td>{user.Nickname}</td>
          <td>
            <button onClick={this.toggleEditing}>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      )
    }
  }
}

export default TableRow
