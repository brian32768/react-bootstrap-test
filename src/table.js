// picture.js
//
import React from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css";

const items = [
    {
        src: '/assets/Proud.jpg',
        header: 'Pigeon', text: ""
    },
    {
        src: '/assets/walking_pigeons.gif',
        header: 'Pigeons, walking', text: ""
    },
    {
        src: '/assets/beaver.jpg',
        header: 'Beaver', text: ""
    },
    {
        src: '/assets/lewis_and_clark.jpg',
        header: 'Lewis and Clark', text: ""
    },
];

const columns = [{
    Header: 'src',
}]

class Table extends React.Component {
    render() {

    const columns = [{
        Header: 'src',
        accessor: 'src'
      }, {
        Header: 'header',
        accessor: 'header'
      }, {
        Header: 'text',
        accessor: 'text'
      }]
      return (

      <ReactTable
        data={items}
        columns={columns}
      />
  );
}
}

export default Table;
