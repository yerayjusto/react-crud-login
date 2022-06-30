import React from "react";
import { useNavigate } from 'react-router-dom';
import * as EmployeeServer from "./EmployeeServer";
import { API_MEDIA_URL } from "./EmployeeServer";


const EmployeeItem = ({employee, listEmployees}) => {
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        await EmployeeServer.deleteEmployee(id);
        listEmployees();
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h3 className="card-title text-center">
                    Name: {employee.employee_name}
                </h3>
                <p className="card-text text-center">Department: <strong>{employee.department}</strong></p>
                <img className="img-thumbnail" height={100} alt="" src={ employee.photo_filename === '' ? `${API_MEDIA_URL}/blank_profile.jpg` : `${API_MEDIA_URL}/${employee.photo_filename}` }></img>
                <button onClick={() => 
                    employee.employee_id && handleDelete(employee.employee_id)} 
                    className="btn btn-sm btn-danger my-2">
                    Delete Employee
                </button>
                <button 
                    className="btn btn-sm btn-info" 
                    onClick={()=> navigate(`/update-employee/${employee.employee_id}`)}>
                    Update
                </button> 
            </div>
        </div>
    );
}

export default EmployeeItem