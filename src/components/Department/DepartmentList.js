import React, { useEffect, useState } from "react";
import DepartmentItem from './DepartmentItem';
import * as DepartmentServer from './DepartmentServer';

const DepartmentList=()=> {

    const [departments, setDepartments]=useState([]);
    const listDepartments= async()=> {
        try {
            const res = await DepartmentServer.listDepartments();
            const data = await res.json();
            setDepartments(data);
                       
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=> {
        listDepartments();
    }, []);
    return (
        <div className="row">
            {departments.map((department) => (
                <DepartmentItem key={department.DepartmentId} department={ department }/>
            ))}
        </div>
    );
};

export default DepartmentList;