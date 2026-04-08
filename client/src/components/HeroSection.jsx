import { Button } from "@/components/ui/button";
import html5 from "@/assets/icons/html5.svg";
import css3 from "@/assets/icons/css3.svg";
import javascript from "@/assets/icons/javascript.svg";
import react from "@/assets/icons/react.svg";
import nodejs from "@/assets/icons/nodejs.svg";
import python from "@/assets/icons/python.svg";
import java from "@/assets/icons/java.svg";
import spring from "@/assets/icons/spring.svg";
import mongodb from "@/assets/icons/mongodb.svg";
import postgresql from "@/assets/icons/postgresql.svg";
import express from "@/assets/icons/express.svg";
import dotnetcore from "@/assets/icons/dotnetcore.svg";

export function Hero(){

const techs = [
  { icon: html5, name: "HTML" },
  { icon: css3, name: "CSS" },
  { icon: javascript, name: "JavaScript" },
  { icon: react, name: "React" },
  { icon: nodejs, name: "Node JS" },
  { icon: python, name: "Python" },
  { icon: java, name: "Java" },
  { icon: spring, name: "Spring" },
  { icon: mongodb, name: "MongoDB" },
  { icon: postgresql, name: "PostgreSQL" },
  { icon: express, name: "Express" },
  { icon: dotnetcore, name: ".NET Core" },
];

    return(
        <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 justify-center items-center p-8">
            <h2>Code It. Learn It</h2>
            <p>Browse our variety of courses that will take you to a career in IT</p>
            <div className="flex flex-row gap-4">
                <Button variant="default">Join Us Now</Button>
                <Button variant="outline">Browse Courses</Button>
            </div>
        </div>
        
        <div className="bg-muted py-12 overflow-hidden">
        <div className="animate-scroll flex gap-12 w-max">
          {[...techs, ...techs].map((tech, i)=> (
            <div key={i} className="flex flex-col items-center gap-2">
                <img src={tech.icon} alt={tech.name} className="size-20"/>
            </div>
          ))}
        </div>
        </div>
        </div>
    )
}