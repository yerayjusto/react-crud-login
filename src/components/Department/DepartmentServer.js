const API_URL="http://127.0.0.1:8000/departments"

export const listDepartments = async () => {
    return await fetch(API_URL);
}