export interface LoginPyload{
    email: string
    password: string
}

export interface SignupPyload extends LoginPyload{
    name: string
}

export interface UserResponse{
    data: {
        id: string,
        name: string,
        email: string,
        created_at: string, 
        updated_at: string
    }
}
export interface AuthResponse{
    token: string
    data: {
        id: string,
        name: string,
        email: string,
        created_at: string, 
        updated_at: string
    }
}

