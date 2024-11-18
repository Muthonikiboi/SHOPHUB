import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/landingPage";
import SignUp from "./Pages/signUp"
import SignIn from "./Pages/signIn"
import Reset from "./Pages/resetPassword"
import Forget from "./Pages/forgotPassword";
import AdminDashboard from "./Pages/adminDashboard";
import RetailerDashboard from "./Pages/retailer";
import SupplierDashboard from "./Pages/supplier";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/> } /> 
              <Route path="/SignUp" element={<SignUp/>} /> 
              <Route path="/SignIn" element={<SignIn/> } /> 
              <Route path="/Reset" element={<Reset/> } /> 
              <Route path="/Forget" element={<Forget/>} /> 
              <Route path="/AdminDashboard" element={<AdminDashboard/>} />
              <Route path="/RetailerDashboard" element={<RetailerDashboard/>} />
              <Route path="/SupplierDashboard" element={<SupplierDashboard/>} />
          </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
