import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import FundTransferDetails from './FundTransferDetails';

function App() {
  return (
    
    <>
      <Routes>
        <Route >
          <Route index element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/fundTransfer" element={<FundTransferDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
