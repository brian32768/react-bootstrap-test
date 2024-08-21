import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { UserContext } from '../usercontext';

const Login = () => {
    const { username } = useContext(UserContext);
    return (
    <>
        {username?username:'Not logged in'}
    </>
    );
}

export default Login;
