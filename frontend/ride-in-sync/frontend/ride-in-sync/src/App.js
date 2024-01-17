import './App.css';
import SignupForm from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './Components/Login';
import TravelerDashborad from './Components/TravelerDashborad';
import CompanionDashborad from './Components/CompanionDashborad';
import RideDetails from './Components/RideDetails';

function App() {
  return (
    // <LoginForm />
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/" element={<SignupForm />}></Route>
          <Route path="/traveler" element={<TravelerDashborad />}></Route>
          <Route path="/companion" element={<CompanionDashborad />}></Route>
          <Route path="/rides/:id" element={<RideDetails />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
