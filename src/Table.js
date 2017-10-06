import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TableHead from './TableHead'
import TableRow from './TableRow'

class Table extends Component {
  render() {
    const rows = []

    let tableStyle = {
      "border": "1px solid black"
    }

    this.props.UsersData.forEach((user) => {
      rows.push(
        <TableRow
          user={user}
          key={user.Name} />
      )
    })

    return (
      <table style={tableStyle}>
        <TableHead />
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
