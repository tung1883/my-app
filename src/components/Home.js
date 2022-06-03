import useAuth from "../hooks/useAuth"
import Login from "./Login";
import Register from "./Register";

const Home = () => {
    const { auth } = useAuth();
    return (
        <div className="middle">
        {
          auth.user ? (
            <>
            </>
          ) : (
            <>
              <section class="intro">
                <h1>Trang web quản lý cơ sở thực phẩm hàng đầu</h1>
                <p>Tiện lợi, nhanh chóng, linh hoạt</p>
              </section>
              <section>
                <Login />
              </section>
            </>
          )
        }
      </div>
    )
}

export default Home