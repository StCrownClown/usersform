import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TableHead from './TableHead'
import Create from './Create'

class TextField extends Component{
  render() {
    let text = this.props.text
    return (
      <td>
        <div>{text}</div>
      </td>
    )
  }
}

class TextInput extends Component {
  render() {
    const {value, onChange, name} = this.props
    return (
      <td>
        <input type="text"
          value={value}
          onChange={onChange}
          name={name}
        />
      </td>
    )
  }
}

class TableRow extends Component {

  constructor(props) {
    super(props)
    this.state={
      Editing:false,
      Name : this.props.data.Name,
      Age: this.props.data.Age,
      Nickname: this.props.data.Nickname,
    }
    this.toggleEditing = this.toggleEditing.bind(this)
    this.onChange = this.onChange.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
  }

  toggleEditing() {
    let Editing = !this.state.Editing
    this.setState(
      {Editing: Editing,
      }
    )
  }

  onChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  saveChanges(){
    const {Name, Age, Nickname} = this.state
    this.toggleEditing()
    this.props.saveChanges({
    	key: this.props.data.Name,
      Name,
      Age,
      Nickname,
    })
  }

  render() {

    const data = this.props.data
    let Editing = this.state.Editing

    if (Editing) {
      return (
        <tr>
          <TextInput value={this.state.Name} name="Name" onChange={this.onChange} ></TextInput>
          <TextInput value={this.state.Age} name="Age" onChange={this.onChange}></TextInput>
          <TextInput value={this.state.Nickname} name="Nickname" onChange={this.onChange}></TextInput>
          <td>
            <button onClick={this.saveChanges} >Done</button>
            <button>Delete</button>
          </td>
        </tr>
      )
    }

    else {
      return (
        <tr>
        <TextField text={data.Name} ></TextField>
        <TextField text={data.Age} ></TextField>
        <TextField text={data.Nickname} ></TextField>
          <td>
            <button onClick={this.toggleEditing}>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      )
    }
  }
}

let UsersData = []

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      UsersData: UsersData
    }
    this.saveChanges = this.saveChanges.bind(this)
  }

  saveChanges({key, Name, Age, Nickname}){
    this.setState(prevState => ({
      UsersData: prevState.UsersData.map(data => {
        if(data.Name === key) return { Name: Name, Age: Age, Nickname: Nickname }
        return data
      })
    }))
  }

  render() {
    const rows = []

    const tableStyle = {
      "border": "1px solid black"
    }

    this.props.UsersData.forEach((data) => {
      if (data['Deleted'] != true) {
        rows.push(
          <TableRow
            key={data.Name}
            saveChanges={this.saveChanges}
            data={data}
            />
        )
      }
    })

    return (
      <table style={tableStyle} >
        <TableHead />
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
