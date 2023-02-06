import React, { useState } from 'react';
import Login from '../Login/Login';
import TasksTable from "../TasksTable/TasksTable";

function App() {
    const [token, setToken] = useState();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <TasksTable name="My List of Todo tasks" />
    );
}

export default App;
