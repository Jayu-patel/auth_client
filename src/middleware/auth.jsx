import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export const Authorization=({children})=>{
    const token = localStorage.getItem('token')

    if(!token){
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children
}

export const UserProtect=({children})=>{
    const user = useSelector(state => state?.user?.username)
    if(!user){
        return <Navigate to={"/"} replace={true} ></Navigate>
    }
    return children
}
