import './App.css'
import Login from './components/login/Login';
import Register from './components/Register';
import Header from './components/Header';
import Home from './components/Home';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { Routes, Route} from "react-router-dom"
import useAuth from './hooks/useAuth';

function App() {
  const { auth } = useAuth();
  return (
    <div className="container">
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' className='loginRoute' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protect routes */}
            {/* <Route path='/admin' element={<Admin />} /> */}
            {/* <Route path='/user' element={<User />} /> */}

            <Route element={<RequireAuth />}>
              
            </Route>

            {/* Catch all */}
            {/* <Route path='/*' element={<Missing />} />> */}
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
