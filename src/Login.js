import auth from './auth'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Register from './Register';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            console.log('HERE IT IS : ' + localStorage.getItem('user-info'));
            const value = JSON.parse(localStorage.getItem('user-info'));
            console.log(value.message);
            if( (value.message) === 'Username or password incorrect'){
                history.push("/fail");
            }
            console.log(value.UserStatus)
            history.push("/app");
        }
    }, [])
    async function login() {
        const value = JSON.parse(localStorage.getItem('user-info'));
        let item = { email,password };
        let result = await fetch("https://localhost:44326/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if(result.message) {
            setMessage(result.message)
            console.log(result.message)
            history.push("/");
        }
        else {
            localStorage.setItem("user-info", JSON.stringify(result))
            history.push("/app")
        }
       
    }
    return ( 

        <div className="align-baseline">

            <h1 className="text-center">Login Page</h1><br/>
            <div className="col-sm-6 offset-sm-3">
                
                <input type="text" placeholder="email" 
                onChange= {(e)=>setEmail(e.target.value)}
                className="form-control"/>
                <br/>
                <input type="password" placeholder="password" 
                onChange= {(e)=>setPassword(e.target.value)}
                className="form-control"/>
                <br/>
                
                {message && (
                    <p className="error" class="text-danger"> {message} </p>
                )}

                <button onClick={login} className="btn btn-primary">Login</button>
                <br/>
                <a href='http://localhost:3000/register' className="btn btn-danger">Register</a>
            </div>
        </div>
    )
}

export default Login
