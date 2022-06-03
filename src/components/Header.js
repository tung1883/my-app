import React from 'react';
import { Outlet } from 'react-router-dom';
import "../css/Header.css";
import useAuth from '../hooks/useAuth';

function Header() {
  const auth = useAuth();
  return (
    auth.user 
    ? (<> </>)
    : (
      <header>
        <a href="/" class="logo">Quản lý <span>Thực phẩm</span></a>
        <nav>
          <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/register">Đăng ký</a></li>
              <li><a href="/login">Đăng nhập</a></li>
          </ul>
        </nav>
      </header>
    )
  )
}

export default Header