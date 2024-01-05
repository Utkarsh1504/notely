import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import { ToastProvider } from "./hooks/useToaster";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
