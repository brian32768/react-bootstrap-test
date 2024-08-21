import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Row, Col} from 'react-bootstrap'; // eslint-disable-line no-unused-vars

import Mark from 'markup-js'

/*
import shortid from 'shortid'
for (let i=0; i<10; i++) {
    console.log("shortid test", shortid.generate());
}
*/
import ReactTable from 'react-table'; // eslint-disable-line no-unused-vars
//import 'react-table/react-table.css'

// see https://react-select.com/
import Select from 'react-select'; // eslint-disable-line no-unused-vars

const rt_columns = [{
        Header: 'src',
        accessor: 'src'
    }, {
        Header: 'label',
        accessor: 'label'
    }, {
        Header: 'text',
        accessor: 'text'
}]

const rt_data = [
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

const rbn_columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const rbn_data  = [
    {id: '1', name: 'squirrel', price:  1.98},
    {id: '2', name: 'moose',    price:  1.98},
    {id: '3', name: 'boris',    price: 17.98},
    {id: '4', name: 'natasha',  price: 34.98},
];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const Table = ({ theme}) => {
    const onChange = (e) => {};
    const template = "Product id {{id}} is described as \"{{name}}\" and costs ${{price}}";
    const d = rbn_data[0];
    const result = Mark.up(template, d);

    return (
        <>
        <h2>templated markup example</h2>
        {result}
        <h2>Examples from react-table</h2>
        <Container fluid={ true }><Row>
            <Col sm="2">
                other stuff, a whole long
                list could go here
            </Col>
            <Col sm="10">
                <h3>single select pick list</h3>
                    <Select
                        classNamePrefix="select"
                        className="basic-single"
                        defaultValue={rt_data[0]}
                        options={ rt_data }
                    />
                <h2>react-table</h2>
                    <ReactTable style={{color: theme.foreground, backgroundColor: theme.background}}
                        data={ rt_data }
                        columns={ rt_columns }
                    />
            </Col></Row>
        </Container>
        </>
    );
}
Table.propTypes = {
    theme: PropTypes.object
}
let mapStateToProps = (state) => ({
    theme: state.theme
});
export default connect(mapStateToProps)(Table);
