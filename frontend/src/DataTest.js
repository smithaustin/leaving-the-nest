import React, { Component } from 'react'
import axios from 'axios';

export class DataTest extends Component {

    state = {
        isLoading: true,
        employees: []
    }

    componentDidMount() {
        axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
            .then(res => {
                const employees = res.data.data;
                this.setState({
                    isLoading: false,
                    employees: employees
                });
                console.log(this.state.employees)
            })
    }

    render() {
        return (
            <div>
                <h1>data test</h1>
                {!this.state.isLoading ? (
                    this.state.employees.map(employee => (
                        <li>{employee.employee_name}</li>)
                    )) : <p>Loading.....</p>}
            </div>
        )
    }
}

export default DataTest
