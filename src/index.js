import React from 'react';
import ReactDOM from 'react-dom';

var UsersData = {};

localStorage.setItem('UsersData', UsersData);

localStorage.getItem('UsersData');

ReactDOM.render(
  <table id="table">
  </table>,
  document.getElementById('table')
);
