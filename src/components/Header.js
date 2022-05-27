import React from 'react';
import "../css/Header.css";


function Header() {
  return (
    <header>
      <a href="#" class="logo">Quản lý <span>Thực phẩm</span></a>
      <nav>
        <ul>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Đăng ký</a></li>
          <li><a href="#">Đăng nhập</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header