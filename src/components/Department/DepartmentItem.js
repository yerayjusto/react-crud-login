import React from "react";

const DepartmentItem = ({department}) => {
    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-title">{department.DepartmentName}</h3>
                <p className="card-text"></p>
            </div>
        </div>
    );
}

export default DepartmentItem