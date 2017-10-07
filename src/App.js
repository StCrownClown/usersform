import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Table from './Table'
import Create from './Create'

let UsersData = [
  {Name: 'AAA', Age: '11', Nickname: 'aa', Deleted: false},
  {Name: 'BBBB', Age: '22', Nickname: 'b', Deleted: false},
  {Name: 'CCCCC', Age: '33', Nickname: 'c', Deleted: false},
  {Name: 'DDDDDD', Age: '44', Nickname: 'd', Deleted: false},
  {Name: 'EEEEEEE', Age: '55', Nickname: 'e', Deleted: false},
  {Name: 'FFFFFFFF', Age: '666', Nickname: 'f', Deleted: true}
]

class App extends Component {
  render() {
    return(
      <div>
        <Table UsersData={UsersData} />
        <Create />
        <button>Add</button>
      </div>
    )
  }
}
export default App
