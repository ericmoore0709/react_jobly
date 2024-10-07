import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import Job from "./Job";
import Company from "./Company";
import NotFound404 from "./NotFound404";
import JoblyApi from "../api";
import { useEffect, useState } from "react";

const RoutesList = () => {

    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading || !companies.length || !jobs.length) {
        return <div><h2>Loading...</h2></div>;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompaniesList companies={companies} />} />
            <Route path="/companies/:handle" element={<Company companies={companies} />} />
            <Route path="/jobs" element={<JobsList jobs={jobs} />} />
            <Route path="/jobs/:id" element={<Job jobs={jobs} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    )
}

export default RoutesList;