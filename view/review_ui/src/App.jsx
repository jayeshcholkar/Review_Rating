import SignUp from "./components/SingUP";
import UserLogin from "./components/UserLogin";
import Hero from "./components/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hero" element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
