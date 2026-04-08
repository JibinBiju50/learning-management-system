import {useMutation} from '@tanstack/react-query'
import { registerTeacher } from '../api/authApi'

//wrap the api call with react query
export const useRegisterTeacher =  () => {
    //useMutation is used for POST, PUT, DELETE
    return useMutation({
        //mutationFn recieves the form object passed to mutate
        mutationFn: ({name, email, password}) => 
            registerTeacher(name, email, password),
    })
}