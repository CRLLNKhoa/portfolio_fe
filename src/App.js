import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme1 from "./themes/Theme_1/Theme1";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:slug" element={<Theme1></Theme1>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
