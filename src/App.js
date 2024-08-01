import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main/Main";
import Book from "./pages/Book/Book";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NewBook from "./pages/NewBook/NewBook";
import DeletePage from "./pages/DeletePage/DeletePage";
import Users from "./pages/Users/Users";
import RequireRole from "./components/requireStatus/RequireRole";
import RequireUnauth from "./components/requireStatus/RequireUnauth";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path=":id" element={<Book />} />
            <Route path="user">
              <Route path=":id" element={<User />} />
            </Route>
            <Route element={<RequireUnauth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<RequireRole roles={[5150, 1984]} />}>
              <Route path="new-book" element={<NewBook />} />
              <Route path="delete-page/:item" element={<DeletePage />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
