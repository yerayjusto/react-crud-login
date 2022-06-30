const API_URL="http://127.0.0.1:8000/accounts";


export const getUser = async () => {
    return await fetch(`${API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
    });
}

export const registerUser = async (newUser) => {
    return await fetch(`${API_URL}/register`, {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
       },
       body:JSON.stringify({
           "name":String(newUser.name).trim(),
           "email":String(newUser.email).trim(),
           "password":String(newUser.password).trim()
       }) 
    });
}

export const login = async (user) => {
    return await fetch(`${API_URL}/login`, {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body:JSON.stringify({
           "email":String(user.email).trim(),
           "password":String(user.password).trim()
       }),
       credentials: 'include'
    });
}

export const logout = async () => {
    return await fetch(`${API_URL}/logout`, {
       method: 'POST'
    });
}