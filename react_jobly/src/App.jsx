import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import Home from './Home';
import { Route, Routes, useNavigate } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import NotFound404 from "./NotFound404";
import JoblyApi from "../api";
import { useEffect, useState } from "react";
import CompanyDetails from "./CompanyDetails";
import PrivateRoute from './PrivateRoute';

function App() {

  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch companies and jobs
        const [companiesResponse, jobsResponse] = await Promise.all([
          JoblyApi.getCompanies(),
          JoblyApi.getJobs()
        ]);

        // Set states
        setCompanies(companiesResponse);
        setJobs(jobsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processLogin = async (data) => {
    try {
      const newToken = await JoblyApi.login(data);

      if (newToken) {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Invalid credentials");
    }
  }

  const processSignup = async (data) => {
    try {
      const newToken = await JoblyApi.signup(data);

      if (newToken) {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error("Invalid credentials");
    }
  }

  const processLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate("/login");
  };

  if (loading || !companies.length || !jobs.length) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <div className='main-container'>

      <Navigation processLogout={processLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<PrivateRoute element={<CompaniesList companies={companies} />} token={token} />} />
        <Route path="/companies/:handle" element={<PrivateRoute element={<CompanyDetails companies={companies} jobs={jobs} />} token={token} />} />
        <Route path="/jobs" element={<PrivateRoute element={<JobsList jobs={jobs} />} token={token} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfileForm />} token={token} />} />
        <Route path="/login" element={<LoginForm processLogin={processLogin} />} />
        <Route path="/signup" element={<SignupForm processSignup={processSignup} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  )
}

export default App
