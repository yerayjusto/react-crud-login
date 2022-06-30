const API_URL="http://127.0.0.1:8000/employees";
export const API_MEDIA_URL="http://127.0.0.1:8000/media";

export const listEmployees = async () => {
    return await fetch(API_URL);
}

export const getEmployee = async (id) => {
    return await fetch(`${API_URL}/${id}`);
}

export const registerEmployee = async (newEmployee) => {
    return await fetch(API_URL, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json' 
       },
       body:JSON.stringify({
           "employee_name":String(newEmployee.employeeName).trim(),
           "department":String(newEmployee.Department).trim(),
           "photo_filename":String(newEmployee.photoFilename).trim()
       }) 
    });
}

export const updateEmployee = async (id, updatedEmployee) => {
    return await fetch(`${API_URL}/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json' 
       },
       body:JSON.stringify({
           "employee_name":String(updatedEmployee.employeeName).trim(),
           "department":String(updatedEmployee.Department).trim(),
           "photo_filename":String(updatedEmployee.photoFilename).trim()
       }) 
    });
}

export const deleteEmployee = async (id) => {
    return await fetch(`${API_URL}/${id}`, {
       method: 'DELETE'
    });
}