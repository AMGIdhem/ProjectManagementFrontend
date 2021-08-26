import auth from './auth'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Register() {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");

    const history = useHistory();
    useEffect(() => {
        //history.push("/register")
        /* if (localStorage.getItem('user-info')) {
            history.push("/project")
        } */
    }, [])
    async function register() {
        let item = { email,name,password };
        fetch('https://localhost:44326/api/users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('Added successfully !');
            history.push("/")
        },
        (error)=>{
            alert('Failed');
        })
        //console.warn(email,password)
        /* let item = { email,password };
        let result = await fetch("https://localhost:44326/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/") */
    }
    return (    
        <div>

            <h1>Register Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <input type="text" placeholder="email" 
                onChange= {(e)=>setEmail(e.target.value)}
                className="form-control"/>
                <br/>
                <input type="text" placeholder="name" 
                onChange= {(e)=>setName(e.target.value)}
                className="form-control"/>
                <br/>
                <input type="password" placeholder="password" 
                onChange= {(e)=>setPassword(e.target.value)}
                className="form-control"/>
                <br/>
                <button onClick={register} className="btn btn-primary">Register</button>
            </div>
        </div>
    )
}

export default Register
