import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main/Main";
import Book from "./pages/Book/Book";
import User from "./pages/User/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":id" element={<Book />} />
          <Route path="user">
            <Route path=":id" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
