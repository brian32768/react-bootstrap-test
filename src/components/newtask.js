import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../redux/actions'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg,
    Button} from 'reactstrap'

class NewTask extends React.Component {
    state = {
        showForm: false,
        title: '',
        description: ''
    };
    resetForm() {
        this.setState({
            showForm: false,
            title: '',
            description: ''
        });
    }
    submit = (e) => {
        e.preventDefault();
        console.log("NewTask.submit",e,this.props);
        this.props.dispatch( addTask({
            title: this.state.title,
            description: this.state.description
        }));
        this.resetForm();
    }
    //toggleForm(e) = (e) => {
        //}
    change = (e) => {
        const { target: {name, value} } = e;
        this.setState({
            [name]:value
        });
    }

    render() {
        let theme = this.props.theme;
        let inverse = (theme.name === "dark");
        return (
            <Card inverse={inverse} style={{backgroundColor: theme.background}}>
            <CardBody>
                <input className="input" name="title" placeholder="title" onChange={ this.change } value={ this.state.title }/><br />
                <input className="input" name="description" placeholder="description" onChange={ this.change } value={ this.state.description }/>
                <div className="button-align">
                    <Button onClick={ this.submit }>add task</Button>
                </div>
            </CardBody>
            </Card>
        );
    }
}
NewTask.propTypes = {
    theme: PropTypes.object
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        theme: state.theme,
        tasks: state.tasks
    };
}
const mapDispatchToProps = {
//    createTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
