import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Table from './Table'
import Create from './Create'

let UsersData = [
  {Name: 'AAA', Age: '11', Nickname: 'aa'},
  {Name: 'BBBB', Age: '22', Nickname: 'b'},
  {Name: 'CCCCC', Age: '33', Nickname: 'c'},
  {Name: 'DDDDDD', Age: '44', Nickname: 'd'},
  {Name: 'EEEEEEE', Age: '55', Nickname: 'e'},
  {Name: 'FFFFFFFF', Age: '666', Nickname: 'f'}
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
