import axios from 'axios'
axios.defaults.baseURL = `${process.env.LINK}`
import {jwtDecode} from 'jwt-decode'

export const verifyUser=async(username)=>{
    try{
        const {data} = await axios.post('/api/auth', {username})
        return Promise.resolve({data})
    }
    catch(error){
        // return {error: "User not found"}
        return Promise.reject({error})
    }
}

export const getUser=async({username})=>{
    try{
        const {data} =  await axios.get(`/api/user/${username}`)
        return {data}
    }
    catch(error){
        return {error: "User don't exist"}
    }
}

export const getUserName=async()=>{
    const token = localStorage.getItem('token')
    if(!token){
        return Promise.reject("Can't find token")
    } 
    const decode = jwtDecode(token)
    return decode
}

export const register=async(userData)=>{
    try{
        const {data: {msg},status} = await axios.post(`/api/register`,userData)

        const {username, email} = userData
        if(status === 201){
            await axios.post(`/api/getMail`, {username, email, text : msg})
        }
        return Promise.resolve(msg)
    }
    catch(error){
        return Promise.reject({error})
    }
}

export const login=async({username,password})=>{
    try{
        const {data} = await axios.post(`/api/login`,{username,password})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Password does not match"})
    }
}

export const updateUser=async(userData)=>{
    try{
        const token = localStorage.getItem('token')
        const data = await axios.put(`/api/updateUser`,userData, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Cant't update user"})
    }
}

export const generateOTP=async(username)=>{
    try{
        const {data: {code}, status} = await axios.get(`/api/otp`, {params: {username}})

        if(status === 201){
            const {data: {email}} = await getUser({username})
            const text = `Your password recovery OTP is ${code}, Please do not share otp anywhere else`
            const subject = `Password reccovery OTP`

            await axios.post(`/api/getMail`,{username, email, text, subject})
            return Promise.resolve(code)
        }
    }
    catch(error){
        return Promise.reject({error})
    }
}

export const verifyOTP=async({username,code})=>{
    try{
        const {data, status} = await axios.get(`/api/verifyOtp`, {params: {username,code}})
        return {data,status}
    }
    catch(error){
        return Promise.reject(error)
    }
}

export const resetPass=async({username,password})=>{
    try{
        const {data, status} = await axios.put(`/api/resetPassword`, {username,password})
        return Promise.resolve({data,status})
    }
    catch(error){
        return Promise.reject({error})
    }
}
