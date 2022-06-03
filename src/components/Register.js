import "../css/Register.css"
import React from 'react';
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/admin/accounts';
 
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(()=> {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                REGISTER_URL,
                { username: user, password: pwd }
            )
            setErrMsg(response.data.message);
            console.log(errMsg);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } 
        catch (err) {
            if (!err?.response){
                setErrMsg("Không nhận được phản hồi từ server");
            } else if (err.response?.status === 409){
                setErrMsg('Tên đăng nhập đã tồn tại');
            } else {
                setErrMsg("Đăng ký không thành công");
            }
        }
    }   

    return (
        <section>
            <p className="registerHeader">Đăng ký</p>

            {/*Error Message */}
{/* {            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>} */}
            <p>{errMsg}</p>
            
            <form onSubmit={handleSubmit}>
                {/*Username*/}
                <label htmlFor='username'>Tài khoản:</label>
                <input 
                    type="text" 
                    id='username' 
                    placeholder='Nhập tài khoản' 
                    ref={userRef} 
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    aria-invalid={ validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    Tài khoản phải từ 4 đến 24 ký tự <br />
                    Phải bắt đầu bằng chữ cái <br />
                    Chỉ dùng chữ cái, chữ số, dấu gạch nối và dấu gạch dưới. 
                </p>

                {/*Password*/}
                <label htmlFor='password'>Mật khẩu:</label>
                <input 
                    type="password" 
                    id='password' 
                    placeholder='Nhập mật khẩu' 
                    autoComplete='off'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-invalid={ validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                    Mật khẩu phải từ 8 đến 24 ký tự <br />
                    Phải có một chữ cái thường, chữ cái hoa, chữ số và ký tự đặc biệt<br />
                    Các ký tự đặc biệt là: !, @, #, $, %
                </p>

                {/*Password confirmation*/}
                <label htmlFor='confirm_pwd'>Nhập lại mật khẩu:</label>
                <input 
                    type="password" 
                    id='confirm_pwd' 
                    placeholder='Nhập lại mật khẩu' 
                    autoComplete='off'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    aria-invalid={ validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="pwdnote" className={ matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                    Mật khẩu không khớp, xin vui lòng nhập lại
                </p>

                <button type="submit" disabled={!validName || !validPwd || !validMatch ? true : false}>Đăng ký</button>
            </form>

            <p class='already-account'>
                    Bạn đã có tài khoản? 
                    <span className="line">
                        {/* put router link here */}
                        <a href="#"> Đăng nhập ngay</a>
                    </span>
                </p>
        </section>
    )
}

export default Register