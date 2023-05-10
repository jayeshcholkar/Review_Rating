import SignUp from "./components/SingUP";
import UserLogin from "./components/UserLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import ResetPass from "./components/ResetPass";
import Home from "./components/Home";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/companyreview/:id" element={<CompanyDetails />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
