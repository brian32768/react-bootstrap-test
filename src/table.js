// table.js react-bootstrap-test
//
import React from "react"
import ReactTable from 'react-table'
import Select, {Option, OptGroup} from 'rc-select'
import {ThemeContext} from './theme-context'
import 'react-table/react-table.css'
import 'rc-select/assets/index.css'

let items = [
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

        let i = items.pop();
        items.push({src: '/assets/pigeon_reading_map.jpg', header: 'Pigeon reading map', text: 'Cartography, Avian'})

        let onChange = () => {};
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
            <div>
            <h3>single select</h3>

            There are lots of nice examples of using rc-select in the git repo
            at https://github.com/react-component/select.git

                <div style={{ width: 300}}>
                  <Select
                  allowClear
                  placeholder="enter name"
                  defaultValue="lucy"
                  style={{ width: 200 }}
                  animation="slide-up"
                  showSearch={false}
                  onChange={onChange}>
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="yiminghe">yiminghe</Option>
                  </Select>
                </div>


              <ReactTable style={{color: theme.foreground, backgroundColor: theme.background}}
                data={items}
                columns={columns}
              />
          </div>
        );
    }
}
Table.contextType = ThemeContext;
