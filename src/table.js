// table.js
//
import React from "react"
import ReactTable from 'react-table'
import {ThemeContext} from './theme-context'
import "react-table/react-table.css"

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

export default class Table extends React.Component {
    render() {
        let theme = this.context;
        console.log("Table.render() theme=", theme)
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
          <ReactTable style={{color: theme.foreground, backgroundColor: theme.background}}
            data={items}
            columns={columns}
          />
        );
    }
}
Table.contextType = ThemeContext;
