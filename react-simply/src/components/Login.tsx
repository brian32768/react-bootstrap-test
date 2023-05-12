import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const Login = () => {
    const [ username, setUsername ] = useState('Login');
    return (
    <>
        {username}
    </>
    );
}
export default Login;
