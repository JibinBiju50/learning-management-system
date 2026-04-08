import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth"
import {Bell, User} from 'lucide-react'
import { Button } from "./ui/button";

export function Navbar(){
    const {user, logout} = useAuth();
    return(
        <nav className="flex flex-row justify-between bg-foreground text-primary-foreground p-4">
        <div className="">
            <h2 className="text-white">Logo</h2>
        </div>

        {!user && 
        <div className="flex gap-2 items-center">
            <Link to="/courses" className="text-white hover:text-white/80">
                Explore Courses
            </Link>

            <Button variant="outline" asChild
            className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                <Link to="/login">Log In</Link>
            </Button>
    
            <Button asChild>
                <Link to="/register">Sign Up</Link>
            </Button> 
        </div>
        }

        {user && user.role=="student" && 
        <div>
            <button>Explore Courses</button>
            <button>Dashboard</button>
            <button><Bell size={20}></Bell> </button>
            <button><User size={20}></User> </button>
            <div className="dropdown-menu">
                <p>My Profile ({user.name})</p>
                <p style={{cursor: "pointer"}} onClick={logout}>Logout</p>
            </div>
        </div>
        }

        {user && user.role == "teacher" && 
        <div>
            <button>My Courses</button>
            <button>Students</button>
            <button><Bell size={20}></Bell> </button>
            <button><User size={20}></User> </button>
            <div className="dropdown-menu">
                <p>My Profile</p>
                <p onClick={logout}>Logout</p>
            </div>
        </div>
        }

        {user && user.role=="admin" &&
        <div>
            <Link to="/admin/enrollments">Enrollments</Link>
            <Link to="/admin/users">Users</Link>
            <button><Bell size={20}></Bell> </button>
            <button><User size={20}></User> </button>
            <div className="dropdown-menu">
                <p>My Profile</p>
                <p>Settings</p>
                <p onClick={logout}>Logout</p>
            </div>
        </div>
        }
        </nav>
    )
}