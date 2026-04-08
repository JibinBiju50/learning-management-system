import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage(){

    //Form state - holds what user types
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    
    //Extract login() from AuthContext
    const {login} = useAuth();

    //navigation function - used to redirect after success
    const navigate = useNavigate();

    //get mutation object from useLogin
    const mutation = useLogin();
    
    //Called when submitting the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Trigger the api call, passing the form data
        mutation.mutate(form, {
            onSuccess: (data) => {
                login(data.user);
                navigate("/")
            }
        });
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
           <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        Login
                    </CardTitle>
                    <CardDescription>Enter your credentials to continue</CardDescription>
                </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} 
            className="flex flex-col gap-4">
                
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password" 
                        type="password" 
                        name="password" 
                        required 
                        value={form.password}
                        onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}/>
                </div>

                {mutation.isError && (
                 <p className="text-sm text-destructive">{mutation.error.message}</p>
                )}

                <Button type="submit" className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Logging" : "Login"}</Button>

                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary underline">
                        Sign up
                    </Link>
                </p>
                
            </form>
        </CardContent>
        </Card>
        </div>
    )
}