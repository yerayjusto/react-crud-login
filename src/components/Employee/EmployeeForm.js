import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import * as EmployeeServer from './EmployeeServer';
import UploadImage from "../Upload/UploadImage";

const EmployeeForm = () => {
const [filename, setFilename] = useState('');
const params = useParams();
const navigate = useNavigate();
const initialState = { employeeName: "", Department: "", photoFilename: "" };
const [employee, setEmployee] = useState(initialState);
const handleInputChange = (e) => {
  setEmployee({ ...employee, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res;
    employee.photoFilename = filename;
    if (!params.id) {
      res = await EmployeeServer.registerEmployee(employee);
      const data = await res.json();
      if (data.message === 'Added succesfully') {
        setEmployee(initialState);
      }
    } else {
      await EmployeeServer.updateEmployee(params.id, employee);
    }
    navigate("/home");
  } catch (error) {
    console.log(error)
  }
}

const getEmployee = async (id) => {
  try {
    const res = await EmployeeServer.getEmployee(id);
    const data = await res.json();
    let { employee_name: employeeName, department: Department, photo_filename: photoFilename } = data[0];
    setEmployee({ employeeName, Department, photoFilename  });
  } catch (error) {
    console.log(error);
  }
} 

useEffect(() => {
  if (params.id) {
    getEmployee(params.id);
  }
}, [params.id]);

  return (
    <div className="col-md-3 mx-auto">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="employeeName" className="form-control" id="name" value={employee.employeeName} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
      <label htmlFor="department" className="form-label">Department</label>
        <input type="text" name="Department" className="form-control" id="department" value={employee.Department} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
      </div>
      <div className="d-grid gap-2">
        {
          params.id?(
            <button type="submit" className="btn btn-block btn-primary">Update</button>
          ):(
            <button type="submit" className="btn btn-block btn-success">Register</button>
        )}
      </div>
    </form>
    <div>
      <UploadImage setFilename={setFilename}/>
    </div>
    </div>
  )
}

export default EmployeeForm