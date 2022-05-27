import './App.css'
import Login from './components/Login';
import Header from './components/Header';

function App() {
  return (
    <main className = 'container'>
      <Header/>
      <div className="middle">
        <section class="intro">
          <h1>Trang web quản lý cơ sở thực phẩm hàng đầu</h1>
          <p>Tiện lợi, nhanh chóng, linh hoạt</p>
        </section>
        <section className='log-in'>
          <Login/>
        </section>
      </div>
    </main>
  )
}

export default App;
