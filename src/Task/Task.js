import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
        };
        this.update = this.update.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.name === null)
            return {name: props.name, description: props.description,};
        else
            return {};
    }

    update = () => {
        this.props.update(this.props.id, this.state.name, this.state.description);
    }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value});
    }

    descriptionChangeHandler = (event) => {
        this.setState({description: event.target.value});
    }

    render() {

        const {name} = this.state;
        const {description} = this.state;

        return (
            <React.Fragment>
                <th>
                    <input
                        type='text'
                        onChange={this.nameChangeHandler}
                        value={name}
                    />
                </th>
                <th>
                    <input
                        type='text'
                        onChange={this.descriptionChangeHandler}
                        value={description}
                    />
                </th>
                <th>
                    <button onClick={this.update}>
                        Save changes
                    </button>
                </th>
            </React.Fragment>
        )

    };
}

export default Task;