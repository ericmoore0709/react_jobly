import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfileForm />} />
        </Routes>
    )
}

export default SiteRoutes;