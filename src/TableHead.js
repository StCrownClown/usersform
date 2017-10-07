import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const colsHead = ['Name','Age','Nickname','Action']

class TableHead extends Component {
  render() {

    const cols = []

    colsHead.forEach((data) => {
      cols.push(
        <th
          data={data}
          key={data} >
          {data}
          </th>
      )
    })

    return(
      <thead>
        <tr>
          {cols}
        </tr>
      </thead>
    )
  }
}

export default TableHead
