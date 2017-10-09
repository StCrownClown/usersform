import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const colsHead = ['Name','Age','Nickname','Action']
let UsersData = []

if (localStorage.getItem('UsersDataLocal')) {
  UsersData = JSON.parse(localStorage.getItem('UsersDataLocal'))
}
else {
  UsersData = [
    {userName: 'AAA', userAge: '11', userNickname: 'aa', Deleted: false},
  ]
  localStorage.setItem('UsersDataLocal', JSON.stringify(UsersData))
}

class TableHead extends Component {
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

class Create extends Component {
  constructor(props) {
    super(props)
    this.state={
      Cancel:false,
      setName : '',
      setAge: '',
      setNickname: ''
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
      Cancel: true
    })
    this.setState({
      Cancel:false,
      setName : '',
      setAge: '',
      setNickname: ''
    })
  }

  saveNewRow(){
    const {setName, setAge, setNickname} = this.state
    this.props.addNewRow({ setName, setAge, setNickname })
    this.setState(this.initialState)
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  render() {
    const {Cancel} = this.state
    return(
      <table>
      <tbody>
      <tr>
      <td><AddInput type="text" name="setName" value={this.state.setName} onChange={this.onChange} ></AddInput></td>
      <td><AddInput type="number" name="setAge" value={this.state.setAge} onChange={this.onChange}></AddInput></td>
      <td><AddInput type="text" name="setNickname" value={this.state.setNickname} onChange={this.onChange}></AddInput></td>
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
    const {value, onChange, name, type} = this.props
    return (
      <input type={type}
      value={value}
      onChange={onChange}
      name={name}
      />
    )
  }
}

class TextCell extends Component {
  render() {
    const {defaultValue, onChange, name, type, value, Editing} = this.props
    if (Editing) {
      return (
        <td>
        <input type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        />
        </td>
      )}
    else {
      return (
        <td>
        {value}
        </td>
      )
    }
  }
}

class TableRow extends Component {

  constructor(props) {
    super(props)
    this.state={
      Editing: false,
      Cancal: false,
      setName : this.props.data.userName,
      setAge: this.props.data.userAge,
      setNickname: this.props.data.userNickname
    }
    this.toggleEditing = this.toggleEditing.bind(this)
    this.setCancel = this.setCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
    this.Deleting = this.Deleting.bind(this)
  }

  toggleEditing() {
    let Editing = !this.state.Editing
    this.setState({
      Editing: Editing
    })
    if (Editing == false) {
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
      Cancel: true,
      Editing: false,
    })
  }

  saveChanges(){
    const {setName, setAge, setNickname} = this.state
    this.props.saveChanges({
      key: this.props.data.userName,
      setName,
      setAge,
      setNickname
    })
    this.setState({
      Editing: false
    })
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  Deleting(){
    const confirm_clear = confirm('DELETE ?')
    if (confirm_clear) {
      this.props.Deleting(this.props.data.userName)
    }
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  render() {
    const {userName, userAge, userNickname} = this.props.data
    const {Editing, setName, setAge, setNickname} = this.state
    return (
      <tr>
      <TextCell type="text" defaultValue={setName} value={userName} name="setName" onChange={this.onChange} Editing={Editing}></TextCell>
      <TextCell type="number" defaultValue={setAge} value={userAge} name="setAge" onChange={this.onChange} Editing={Editing}></TextCell>
      <TextCell type="text" defaultValue={setNickname} value={userNickname} name="setNickname" onChange={this.onChange} Editing={Editing}></TextCell>
      <td>
      <button onClick={this.toggleEditing} >Edit</button>
      { this.state.Editing ? <button onClick={this.setCancel} >Cancel</button> : <button onClick={this.Deleting} >Delete</button> }
      </td>
      </tr>
    )
  }
}

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      UsersData: UsersData,
      Adding:false,
    }
    this.Deleting = this.Deleting.bind(this)
    this.addNewRow = this.addNewRow.bind(this)
    this.setAdding = this.setAdding.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
  }

  Deleting(key){
    this.setState(prevState => ({
      UsersData: prevState.UsersData.filter(data => {
        return data.userName !== key
      })
    }))
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  addNewRow({setName,setAge, setNickname }) {
    this.setState(prevState => ({
      UsersData: prevState.UsersData.concat([{userName: setName, userAge: setAge, userNickname: setNickname}])
    }))
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  setAdding() {
    let Adding = !this.state.Adding
    this.setState({
      Adding: Adding
    })
  }

  saveChanges({key, setName, setAge, setNickname}){
    this.setState(prevState => ({
      UsersData: prevState.UsersData.map(data => {
        if(data.userName === key)
        return { userName: setName, userAge: setAge, userNickname: setNickname }
        return data
      })
    }))
    console.log(this.state)
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(userDataArray))
  }

  render() {
    const rows = []
    this.state.UsersData.forEach((data) => {
      if (data['Deleted'] != true) {
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
      { this.state.Adding ? <Create addNewRow={this.addNewRow} /> : null }
      <button onClick={this.setAdding}>Add</button>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <Table />
      </div>
    )
  }
}

export default App
