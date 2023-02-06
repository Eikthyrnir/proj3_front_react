import React from 'react';
import Task from "../Task/Task";
import axios from 'axios';


class TasksTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todosList: []};
        this.token = "";
        this.addTodo = this.addTodo.bind(this);
    };


    addTodo = () => {
        let newelement = {
            name: this.state.taskName,
            description: this.state.taskDesc,
        };

        this.setState({taskName: "", taskDesc: "",}, () =>
                axios.post(`http://localhost:8080/api/task`, newelement)
                     .then(res => {
                         newelement = res.data;
                         this.setState({todosList: [...this.state.todosList, newelement]})
                     })
        );
    };

    handleRemove = id => {
        let object = this.state.todosList.find(function (item) {
            if (item.id === id) return item;
            return null;
        });
        let arrAfterDel = this.state.todosList.filter(function (item) {
            return item.id !== id
        });
        this.setState({todosList: arrAfterDel},
            () => axios.delete(`http://localhost:8080/api/task/${object.id}`));
    }

    nameChangeHandler = (event) => {
        this.setState({taskName: event.target.value});
    }

    descriptionChangeHandler = (event) => {
        this.setState({taskDesc: event.target.value});
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/tasks`, { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then(res => {
                const todosList = res.data;
                this.setState({todosList});
            })
    }

    updateChild = (id, name, description) => {
        let arrAfterUpdate = this.state.todosList.map(function (item) {
            if(item.id === id) {
                item.name = name;
                item.description = description;
            }
            return item;
        });

        let object = arrAfterUpdate.find(function (item) {
            if(item.id === id) return item;
            return null;
        });

        if (object === null) {
            return;
        }

        this.setState({todosList: arrAfterUpdate}, () =>
            axios.patch(`http://localhost:8080/api/task/${object.id}`, object));
    };

    render() {

        const {todosList} = this.state;

        let todos = todosList.map(task => {
            return (<tr key={task.id}>
                <Task name={task.name}
                      description={task.description}
                      id={task.id}
                      update={(id, name, description) => this.updateChild(id, name, description)}/>
                <th>
                    <button type="button" onClick={() => this.handleRemove(task.id)}>
                        Remove
                    </button>
                </th>
            </tr>);
        })

        return (
            <div className="TasksTable">
                <h1>Tasks {this.props.name}</h1>
                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos}
                    </tbody>
                </table>
                <p> Create new task</p>
                <label>
                    Name
                    <input
                        type='text'
                        onChange={this.nameChangeHandler}
                        value={this.state.taskName}
                    />
                </label>
                <label>
                    Description
                    <input
                        type='text'
                        onChange={this.descriptionChangeHandler}
                        value={this.state.taskDesc}
                    />
                </label>

                <button onClick={this.addTodo}>
                    AddTodo
                </button>
            </div>
        );
    }
}

export default TasksTable;