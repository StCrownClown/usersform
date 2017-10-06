import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class TableHead extends Component {
  render() {

    return(
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Nickname</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }
}

export default TableHead
