import {useMutation} from '@tanstack/react-query'
import { loginUser } from '../api/authApi'

//wrap the api call with react query
export const useLogin =  () => {
    //useMutation is used for POST, PUT, DELETE
    return useMutation({
        //mutationFn recieves the form object passed to mutate
        mutationFn: ({email, password}) => 
            loginUser(email, password),
    })
}