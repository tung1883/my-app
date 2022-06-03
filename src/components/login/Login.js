import React from 'react'
import {useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import "./login.css"
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
        console.log(msg);
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

    return (
        auth.user ? (
            <Navigate to="/" state={{ from:location}} replace /> 
        ) : (
            <section>
                <form className='log-in' onSubmit={handleAuth}>
                    <label htmlFor='username'>Tài khoản:</label>
                    <input 
                        type="text" 
                        id='username' 
                        placeholder='Nhập tài khoản' 
                        ref={userRef} 
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label htmlFor='password'>Mật khẩu:</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='Nhập mật khẩu' 
                        autoComplete='off'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <p ref={msgRef} className={msg ? "msg" : "offscreen"} aria-live="assertive">
                        {msg}
                    </p>
                    <button type="submit">Đăng nhập</button>
                    <p class='no-account'>
                        Bạn chưa có tài khoản? 
                        <span className="line">
                            {/* put router link here */}
                            <a href="#"> Đăng ký ngay</a>
                        </span>
                    </p>
                </form>
            </section>
        )
    )
}

export default Login