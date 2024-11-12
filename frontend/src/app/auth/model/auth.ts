export interface LoginPyload{
    email: string
    password: string
}

export interface SignupPyload extends LoginPyload{
    name: string
}

export interface User{
    id: string,
    name: string,
    email: string,
    created_at: string, 
    updated_at: string
}

export interface UserResponse{
    data:User
}
export interface AuthResponse extends UserResponse{
    token: string
}

