import React, {Component} from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg,
    Button} from 'reactstrap'

export default class NewTask extends Component {
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
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description
        });
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
        let inverse = (theme.name == "dark");
        return (
            <Card>
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
