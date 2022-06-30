import React, { useEffect, useState } from "react";
import EmployeeItem from './EmployeeItem';
import * as EmployeeServer from './EmployeeServer';

const EmployeeList=()=> {

    const [employees, setEmployees]=useState([]);
    const listEmployees= async()=> {
        try {
            const res = await EmployeeServer.listEmployees();
            const data = await res.json();
            setEmployees(data);    
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=> {
        listEmployees();
    }, []);
    
    return (
        <div className="row">
            {employees.map((employee) => (
                <EmployeeItem key={employee.employee_id} employee={ employee } listEmployees={listEmployees} />
            ))}
        </div>
    );
};

export default EmployeeList;