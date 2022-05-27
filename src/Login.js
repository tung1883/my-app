import React from 'react'
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true)
        } catch (err) {
            if (!err?.response){
                setErrMsg('No server response!');
            } else if (err.reponse?.status === 400) {
                setErrMsg('Missing username or password');   
            } else if (err.reponse?.status === 401) {
                setErrMsg('Unauthorized User');   
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
        setUser('');
        setPwd('');
        setSuccess(true)
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Đăng nhập thành công!</h1>
                    <br />
                    <p>
                        <a href="#">Quay lại trang chủ</a>
                    </p>
                </section>
            ) : (
                <section>
                <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                <form onSubmit={handleSubmit}>
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
                    <label htmlFor='password'>Mật khẩu</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='Nhập mật khẩu' 
                        autoComplete='off'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button type="submit">Đăng nhập</button>
                    <p>
                        Bạn chưa có tài khoản? 
                        <span className="line">
                            {/* put router link here */}
                            <a href="#"> Đăng ký ngay</a>
                        </span>
                    </p>
                </form>
            </section>
            )}
        </>
    )
}

export default Login