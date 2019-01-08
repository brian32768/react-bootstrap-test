// table.js react-bootstrap-test
//
import React, { Component, Fragment } from "react"
import ReactTable from 'react-table'
import {ThemeContext} from './theme-context'
import 'react-table/react-table.css'

// see https://react-select.com/
import Select from 'react-select'

let items = [
    {
        src: '/assets/Proud.jpg',
        label: 'Pigeon', text: ""
    },
    {
        src: '/assets/walking_pigeons.gif',
        label: 'Pigeons, walking', text: ""
    },
    {
        src: '/assets/beaver.jpg',
        label: 'Beaver', text: ""
    },
    {
        src: '/assets/lewis_and_clark.jpg',
        label: 'Lewis and Clark', text: ""
    },
    {
        src: '/assets/pigeon_reading_map.jpg',
        label: 'Pigeon reading map', text: 'Avian user of cartography'
    }
];

const columns = [{
    Header: 'src',
}]

export default class Table extends Component {
    render() {
        let onChange = () => {};
        let theme = this.context;
        console.log("Table.render() theme=", theme)
        const columns = [{
                Header: 'src',
                accessor: 'src'
            }, {
                Header: 'label',
                accessor: 'label'
            }, {
                Header: 'text',
                accessor: 'text'
        }]
        return (
            <Fragment>
            <h2>Table</h2>
            <h3>single select</h3>
                <Select
                    classNamePrefix="select"
                    className="basic-single"
                    defaultValue={items[0]}
                    options={ items }
                />

            <ReactTable style={{color: theme.foreground, backgroundColor: theme.background}}
                data={items}
                columns={columns}
            />
          </Fragment>
        );
    }
}
Table.contextType = ThemeContext;
