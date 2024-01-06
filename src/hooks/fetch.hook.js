import axios from "axios";
import { useEffect, useState } from "react";
import { getUserName } from "../helper/helper";
axios.defaults.baseURL = 'http://localhost:8080'

export const useFetch=(query)=>{
    const [getData, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    })

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setData(prev => ({...prev, isLoading: true}))

                const {username} = !query ? await getUserName() : ''
                const {data, status} = !query ? 
                await axios.get(`api/user/${username}`):
                await axios.get(`/api/${query}`)

                if(status === 201){
                    setData(prev => ({...prev, isLoading: false, apiData: data, status: status}))
                }

                setData(prev => ({...prev, isLoading: false}))
            }
            catch(error){
                setData(prev => ({...prev, isLoading: false, serverError: error}))
            }
        }
        fetchData()
    },[query])

    return [getData,setData]
}