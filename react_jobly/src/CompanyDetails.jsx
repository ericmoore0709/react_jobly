import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import NotFound404 from "./NotFound404";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const CompanyDetails = ({ companies, jobs, appliedJobs, applyToJob }) => {

    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        if (companies.length > 0) {
            const foundCompany = companies.find(x => x.handle === handle);
            if (!foundCompany) return <NotFound404 />
            setCompany(foundCompany);
        }
    }, [companies, handle])

    // Filter jobs by company handle
    const companyJobs = jobs.filter(job => job.companyHandle === handle);

    if (!company) {
        return <NotFound404 />;
    }

    const { name, description, numEmployees, logoUrl } = company;

    return (
        <div className="main-container">
            <h1>{name}</h1>
            <p>{description}</p>
            <img src={logoUrl} width={'200px'} />
            <p><strong>{numEmployees} employees</strong> work here</p>

            <div>
                <h2>Jobs</h2>
                <div>
                    {companyJobs.map(x => <JobCard key={x.id} id={x.id} title={x.title} salary={x.salary} equity={x.equity} applied={appliedJobs.includes(x.id)} applyToJob={applyToJob} />)}
                </div>
            </div>
        </div>
    )
}

CompanyDetails.propTypes = {
    companies: PropTypes.array.isRequired,
    jobs: PropTypes.array.isRequired,
    appliedJobs: PropTypes.array,
    applyToJob: PropTypes.func.isRequired
}

export default CompanyDetails;