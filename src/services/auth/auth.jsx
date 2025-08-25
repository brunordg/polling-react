import instance from "../../environment/axiosInstance";



export const signup = async (signupDTO) => {
    try {
        return await instance.post("api/auth/signup", signupDTO);
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}

export const login = async (loginDTO) => {
    try {
        return await instance.post("api/auth/login", loginDTO);        
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}