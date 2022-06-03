import React from 'react'
import {useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import "./Login.css"
const LOGIN_URL = '/auth/login';

const Login = () => {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const userRef = useRef();
    const msgRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                { username: user, password: pwd }
            );

            /*const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles; */
            setAuth({ user, pwd }); 
            setUser('');
            setPwd('');
            navigate(from, { replace: true});
        } catch (err) {;
            if (!err?.response){
                setMsg('Không nhận được phản hồi từ server!');
            } else if (err.response?.status) {
                setMsg(err.response.data.message); 
            } else {
                setMsg('Đăng nhập không thành công');
            }
        }
    }

    const onChangeHandler = (e) => {
        setMsg('');
        if (e.target.name === 'username'){
            setUser(e.target.value);
        } else {
            setPwd(e.target.value);
        }
    }

    return (
        auth.user ? (
            <Navigate to="/" state={{ from:location}} replace /> 
        ) : (
            <section>
                <form className='log-in' onSubmit={handleAuth}>
                    <h1 className='loginHeader'>Đăng nhập</h1>
                    <label htmlFor='username'>Tài khoản:</label>
                    <input 
                        type="text" 
                        id='username' 
                        placeholder='Nhập tài khoản' 
                        ref={userRef} 
                        autoComplete='off'
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        value={user}
                        name='username'
                        required
                    />
                    <label htmlFor='password'>Mật khẩu:</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='Nhập mật khẩu' 
                        autoComplete='off'
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        value={pwd}
                        name='password'
                        required
                    />
                    <p ref={msgRef} className={msg ? "msg" : "offscreen"} aria-live="assertive">
                        {msg}
                    </p>
                    <button type="submit">Đăng nhập</button>
                </form>
            </section>
        )
    )
}

export default Login