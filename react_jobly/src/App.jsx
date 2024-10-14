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
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
    }
  }, [token]);

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

  /**
   * Processes login data
   * @param {*} data the login data
   */
  const processLogin = async (data) => {
    try {
      const newToken = await JoblyApi.login(data);

      if (newToken) {
        setToken(newToken);
        setUsername(data.username);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', data.username);
        JoblyApi.token = token;
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Invalid credentials");
    }
  }

  /**
   * Processes registration data
   * @param {*} data the registration data
   */
  const processSignup = async (data) => {
    try {
      const newToken = await JoblyApi.signup(data);

      if (newToken) {
        setToken(newToken);
        setUsername(data.username);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', data.username);
        JoblyApi.token = token;
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error("Invalid credentials");
    }
  }

  /**
   * Log out the user. Ends the current session.
   */
  const processLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    JoblyApi.token = null;
    navigate("/login");
  };

  /**
   * Updates the user profile
   * @param {*} data the user profile data to update
   */
  const updateUser = async (data) => {
    try {
      const user = await JoblyApi.updateUser(username, data);

      if (user) {
        navigate("/");
      }
    } catch (err) {
      console.error("User update error:", err);
      throw new Error("User update failed.");
    }
  }

  /**
   * Attempts to apply user for job. 
   * 
   * 
   * The backend contains no function for retrieving applied jobs, so this function "works" regardless of whether the backend errs or not. 
   * @param {*} jobId the ID of the job
   */
  const applyToJob = async (jobId) => {

    if (!username) return navigate('/');

    try {
      await JoblyApi.applyToJob(jobId, username);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to apply to job.");
    } finally {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  }

  if (loading || !companies.length || !jobs.length) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <div className='main-container'>

      <Navigation processLogout={processLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<PrivateRoute element={<CompaniesList companies={companies} />} token={token} />} />
        <Route path="/companies/:handle" element={<PrivateRoute element={<CompanyDetails companies={companies} jobs={jobs} appliedJobs={appliedJobs} applyToJob={applyToJob} />} token={token} />} />
        <Route path="/jobs" element={<PrivateRoute element={<JobsList jobs={jobs} appliedJobs={appliedJobs} applyToJob={applyToJob} />} token={token} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfileForm updateUser={updateUser} username={username} />} token={token} />} />
        <Route path="/login" element={<LoginForm processLogin={processLogin} />} />
        <Route path="/signup" element={<SignupForm processSignup={processSignup} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  )
}

export default App
