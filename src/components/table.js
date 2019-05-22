import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'

// Examples with two different widgets, react-table and react-bootstrap-table2.
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import BootstrapTable from 'react-bootstrap-table-next';

// see https://react-select.com/
import Select from 'react-select'

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


class Table extends React.Component {
    static propTypes = {
        theme: PropTypes.object
    }

/*
    const solrQ="https://solr.wildsong.biz/solr/taxlots/select?q=*";
        axios.get(solrQ)
        .then( (response) => {
            console.log("I have data", response);
        } )
        .catch( (error) => {
            console.log("WhatsamattaU");
        } )

*/

    render() {
        let onChange = () => {};
        let theme = this.props.theme;

        console.log("rbn_data", rbn_data);

        return (
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

                <Row><Col>
                    <h2>react-bootstrap-table</h2>
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={ rbn_data }
                      columns={ rbn_columns }
                      striped
                      hover
                      condensed
                      defaultSorted={ defaultSorted }
                    />
                </Col></Row>
            </Container>
        );
    }
}

let mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(Table);
