import { useState } from "react"
import {useRegisterTeacher} from "@/hooks/useRegisterTeacher"
import { useNavigate} from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AdminDashboard(){
    //Form state - holds what user types
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })


    //navigation function - used to redirect after success
    const navigate = useNavigate();

    //get mutation object from useRegister
    const mutation = useRegisterTeacher();
    
    //Called when submitting the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Trigger the api call, passing the form data
        mutation.mutate(form, {
            onSuccess: () => {
                navigate("/");
            }
        });
    }
    return(
        <div>
            <h1>Welcome Admin</h1>
            <h2>Create Teacher Account</h2>

            <div className="min-h-screen flex justify-center items-center">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                               <CardTitle>
                                    Create an account
                                </CardTitle>
            
                                <CardDescription>
                                   Enter your information below to create account
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                id="name" 
                                type="text" 
                                name="name" 
                                required 
                                value={form.name}
                                onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))}/>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                            <Input 
                            id="email"
                            type="email" 
                            name="email"  
                            required 
                            value={form.email}
                            onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}/>
                            </div>
            
                            <div className="flex flex-col gap-2">
                                <Label>Password</Label>
                            <Input
                            id="password"
                            type="password" 
                            name="password" 
                            required 
                            value={form.password}
                            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}/>
                            </div>
            
                            {mutation.isError && <p className="text-sm text-destructive">{mutation.error.message}</p>}
            
                            <Button type="submit" className="w-full" disabled={mutation.isPending} >{mutation.isPending ? "Registering" : "Register"}</Button>
        
                        </form>
                    </CardContent>
                    </Card>
                    </div>

        </div>
    )
}