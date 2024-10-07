import PropTypes from 'prop-types';
import NotFound404 from './NotFound404';
import { Link, useParams } from 'react-router-dom';

const JobDetails = ({ jobs }) => {
    const { id } = useParams();
    const job = jobs.find(x => x.id === Number(id));

    if (!job) return (<NotFound404 />);

    const { title, salary, equity, companyHandle, companyName } = job;

    return (
        <div className='main-container'>
            <h1>{title}</h1>
            <p>Offered by <Link to={`/companies/${companyHandle}`}>{companyName}</Link></p>
            <p>Salary: {salary ? `$${salary.toLocaleString()}` : 'none'}</p>
            <p>Equity: {equity ? `${(equity * 100).toFixed(2)}%` : 'none'}</p>
        </div>
    )
}

JobDetails.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default JobDetails;