import {useMutation} from '@tanstack/react-query'
import { registerUser } from '../api/authApi'

//wrap the api call with react query
export const useRegister =  () => {
    //useMutation is used for POST, PUT, DELETE
    return useMutation({
        //mutationFn recieves the form object passed to mutate
        mutationFn: ({name, email, password}) => 
            registerUser(name, email, password),
    })
}