import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const colsHead = ['Name','Age','Nickname','Action']
let UsersData = []

if (localStorage.getItem('UsersDataLocal')) {
  UsersData = JSON.parse(localStorage.getItem('UsersDataLocal'))
}
else {
  UsersData = [
    {userName: 'TEST', userAge: '1', userNickname: 'A'},
  ]
  localStorage.setItem('UsersDataLocal', JSON.stringify(UsersData))
}

function SaveLocalStorage(userDataArray, todo) {
  if (todo == 'delete') {
    localStorage.setItem('UsersDataLocal', JSON.stringify(userDataArray))
  }
  else if (todo == 'edit') {
    localStorage.setItem('UsersDataLocal', JSON.stringify(userDataArray))
  }
  else if (todo == 'new') {
    if (JSON.parse(localStorage.getItem('UsersDataLocal')) == null) {let addNew = []}
    let addNew = JSON.parse(localStorage.getItem('UsersDataLocal'))
    addNew.push(userDataArray)
    localStorage.setItem('UsersDataLocal', JSON.stringify(addNew))
  }
}

class TableHead extends React.Component {
  render() {
    const cols = []

    colsHead.forEach((data) => {
      cols.push(
        <th key={data}>{data}</th>
      )
    })

    return(
      <thead>
        <tr>{cols}</tr>
      </thead>
    )
  }
}

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      userName : '',
      userAge: '',
      userNickname: ''
    }
    this.initialState = this.state
    this.onChange = this.onChange.bind(this)
    this.saveNewRow = this.saveNewRow.bind(this)
    this.toggleCancel = this.toggleCancel.bind(this)
  }

  onChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  toggleCancel() {
    this.setState({
      userName : '',
      userAge: '',
      userNickname: ''
    })
  }

  saveNewRow(){
    const {userName, userAge, userNickname} = this.state
    this.props.addNewRow({ userName, userAge, userNickname })
    this.setState(this.initialState)
    console.log('Table.saveNewRow')
    console.log(this.state)
    let userDataArray = this.state
    let todo = 'new'
    SaveLocalStorage(userDataArray, todo)
  }

  render() {
    return(
      <table>
        <tbody>
          <tr>
          <td><AddInput type='text' name='userName' value={this.state.userName} onChange={this.onChange} ></AddInput></td>
          <td><AddInput type='number' name='userAge' value={this.state.userAge} onChange={this.onChange} min='1' max='150'>></AddInput></td>
          <td><AddInput type='text' name='userNickname' value={this.state.userNickname} onChange={this.onChange}></AddInput></td>
          <td><button onClick={this.saveNewRow}>Save</button>
          <button onClick={this.toggleCancel}>Cancel</button>
          </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class AddInput extends React.Component {
  render() {
    const {value, onChange, name, type, min, max} = this.props
    return (
      <input type={type}
        value={value}
        onChange={onChange}
        name={name}
        min={min}
        max={max}
      />
    )
  }
}

class TextCell extends React.Component {
  render() {
    const {defaultValue, onChange, name, type, value, Edit, min, max} = this.props
    if (Edit) {
      return (
        <td>
          <input type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            name={name}
            min={min}
            max={max}
            />
        </td>
      )}
      else {
        return (
          <td>{value}</td>
        )
      }
    }
  }

  class TableRow extends React.Component {

    constructor(props) {
      super(props)
      this.state={
        Edit: false,
        userName : this.props.data.userName,
        userAge: this.props.data.userAge,
        userNickname: this.props.data.userNickname
      }
      this.toggleEdit = this.toggleEdit.bind(this)
      this.setCancel = this.setCancel.bind(this)
      this.onChange = this.onChange.bind(this)
      this.saveChanges = this.saveChanges.bind(this)
      this.Deleting = this.Deleting.bind(this)
    }

    toggleEdit() {
      let Edit = !this.state.Edit
      this.setState({
        Edit: Edit
      })
      if (Edit == false) {
        this.saveChanges()
      }
    }

    onChange(event){
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    setCancel() {
      this.setState({
        Edit: false,
      })
    }

    saveChanges(){
      const {userName, userAge, userNickname} = this.state
      this.props.saveChanges({
        key: this.props.data.userName,
        userName,
        userAge,
        userNickname
      })
      this.setState({
        Edit: false
      })
      console.log('TableRow.saveChanges')
      console.log(UsersData)
      for (let val in UsersData) {
        if (this.props.data == UsersData[val]) {
          UsersData[val] = this.state
        }
      }
      let userDataArray = UsersData
      let todo = 'edit'
      SaveLocalStorage(userDataArray, todo)
    }

    Deleting(){
      const confirm_clear = confirm('DELETE ?')
      if (confirm_clear) {
        this.props.Deleting(this.props.data.userName)
      }
    }

    render() {
      const {Edit, userName, userAge, userNickname} = this.state
      return (
        <tr>
          <TextCell type='text' defaultValue={userName} value={userName} name='userName' onChange={this.onChange} Edit={Edit}></TextCell>
          <TextCell type='number' defaultValue={userAge} value={userAge} name='userAge' onChange={this.onChange} Edit={Edit} min='1' max='150'>></TextCell>
          <TextCell type='text' defaultValue={userNickname} value={userNickname} name='userNickname' onChange={this.onChange} Edit={Edit}></TextCell>
          <td>
            <button onClick={this.toggleEdit} >Edit</button>
            { this.state.Edit ? <button onClick={this.setCancel} >Cancel</button> : <button onClick={this.Deleting} >Delete</button> }
          </td>
        </tr>
      )
    }
  }

  class Table extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        UsersData: UsersData,
        Add:false,
      }
      this.Deleting = this.Deleting.bind(this)
      this.addNewRow = this.addNewRow.bind(this)
      this.setAdd = this.setAdd.bind(this)
      this.saveChanges = this.saveChanges.bind(this)
    }

    Deleting(data, key){
      this.setState(prevState => ({
        UsersData: prevState.UsersData.filter(data => {
          if (data !== null) {
            return data.userName !== key
          }
        })
      }))
      for (let val in UsersData) {
        if (UsersData[val] !== null) {
          if (UsersData.hasOwnProperty(val) && UsersData[val].userName == data) {
            console.log(val)
            Array.prototype.remove = function(val){
              this.splice(val,1);
            }
            UsersData.remove(val)
          }
        }
      }
      console.log('Table.Deleting')
      console.log(UsersData)
      let userDataArray = UsersData
      let todo = 'delete'
      SaveLocalStorage(userDataArray, todo)
    }

    addNewRow({userName,userAge, userNickname }) {
      this.setState(prevState => ({
        UsersData: prevState.UsersData.concat([{userName: userName, userAge: userAge, userNickname: userNickname}])
      }))
    }

    setAdd() {
      let Add = !this.state.Add
      this.setState({
        Add: Add
      })
    }

    saveChanges({key, userName, userAge, userNickname}){
      this.setState(prevState => ({
        UsersData: prevState.UsersData.map(data => {
          if (data !== null) {
            if(data.userName === key && data !== null)
              return { userName: userName, userAge: userAge, userNickname: userNickname }
              return data
          }
          return data
        })
      }))
    }

    render() {
      const rows = []
      this.state.UsersData.forEach((data) => {
        if (data !== null) {
          rows.push (
            <TableRow
              key={data.userName}
              saveChanges={this.saveChanges}
              Deleting={this.Deleting}
              data={data}
              />
          )
        }
      })

      return (
        <div>
          <table>
            <TableHead/>
            <tbody>{rows}</tbody>
          </table>
          { this.state.Add ? <Create addNewRow={this.addNewRow} /> : null }
          <button onClick={this.setAdd}>Add</button>
        </div>
      )
    }
  }

  class App extends React.Component {
    render() {
      return (
        <div>
          <Table />
        </div>
      )
    }
  }

  export default App
