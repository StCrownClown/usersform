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
      setName : UsersData.userName,
      setAge: UsersData.userAge,
      setNickname: UsersData.userNickname
    }
    this.onChange = this.onChange.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
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
  }

  saveChanges(){
    const {setName, setAge, setNickname} = this.state
    this.toggleEditing()
    this.props.saveChanges({
      key: this.props.data.userName,
      setName,
      setAge,
      setNickname
    })
  }

  render() {
    const {Cancel} = this.state
    return(
      <table>
        <tbody>
          <tr>
            <td><AddInput type="text" name="setName"></AddInput></td>
            <td><AddInput type="number" name="setAge"></AddInput></td>
            <td><AddInput type="text" name="setNickname"></AddInput></td>
            <td><button id="Save" >Save</button>
            <button id="Cancel" onClick={this.toggleCancel}>Cancel</button>
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

class TextCell extends Component{
  render() {
    const {value, onChange, name, type} = this.props
    return (
      <td>
        <input type={type}
          value={value}
          name={name}
          readOnly
        />
      </td>
    )
  }
}

class TextInput extends Component {
  render() {
    const {defaultValue, onChange, name, type} = this.props
    return (
      <td>
        <input type={type}
          defaultValue={defaultValue}
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
      setName : this.props.data.userName,
      setAge: this.props.data.userAge,
      setNickname: this.props.data.userNickname
    }
    this.toggleEditing = this.toggleEditing.bind(this)
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

  saveChanges(){
    const {setName, setAge, setNickname} = this.state
    this.props.saveChanges({
      key: this.props.data.userName,
      setName,
      setAge,
      setNickname
    })
    this.setState({
      Editing: !this.state.Editing
    })
    // let userDataArray = []
    // userDataArray = "["+JSON.stringify(this.state)+"]"
    // console.log(JSON.stringify(UsersData))
    // console.log(UsersData)
    // localStorage.setItem('UsersDataLocal', UsersData)
  }

  Deleting(){
    const confirm_clear = confirm('DELETE ?')
    if (confirm_clear) {
      this.props.Deleting(this.props.data.userName)
    }
  }

  render() {
    const {userName, userAge, userNickname} = this.props.data
    const {Editing, setName, setAge, setNickname} = this.state
    if (Editing) {
      return (
        <tr>
          <TextInput type="text" defaultValue={setName} name="setName" onChange={this.onChange}></TextInput>
          <TextInput type="number" defaultValue={setAge} name="setAge" onChange={this.onChange}></TextInput>
          <TextInput type="text" defaultValue={setNickname} name="setNickname" onChange={this.onChange}></TextInput>
          <td>
          <button id="Edit" onClick={this.toggleEditing} >Edit</button>
          <button id="Delete" onClick={this.Deleting} >Delete</button>
          </td>
        </tr>
      )
    }
    else {
      return (
        <tr>
          <TextCell type="text" value={userName} ></TextCell>
          <TextCell type="number" value={userAge} ></TextCell>
          <TextCell type="text" value={userNickname} ></TextCell>
          <td>
          <button id="Edit" onClick={this.toggleEditing} >Edit</button>
          <button id="Delete" onClick={this.Deleting} >Delete</button>
          </td>
        </tr>
      )
    }
  }
}

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      UsersData: UsersData
    }
    this.saveChanges = this.saveChanges.bind(this)
    this.Deleting = this.Deleting.bind(this)
  }

  Deleting(key){
    this.setState(prevState => ({
      UsersData: prevState.UsersData.filter(data => {
        return data.userName !== key
      })
    }))
  }

  saveChanges({key, setName, setAge, setNickname}){
    this.setState(prevState => ({
      UsersData: prevState.UsersData.map(data => {
        if(data.userName === key)
        return { userName: setName, userAge: setAge, userNickname: setNickname }
        return data
      })
    }))
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
      <table>
        <TableHead/>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      Adding:false,
    }
    this.setAdding = this.setAdding.bind(this)
  }

  setAdding() {
    this.setState({
      Adding: true
    })
  }
  render() {
    let Adding = this.state.Adding
    return (
      <div>
        <Table UsersData={UsersData} />
        { this.state.Adding ? <Create /> : null }
        <button id="Add" onClick={this.setAdding}>Add</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('App')
)
