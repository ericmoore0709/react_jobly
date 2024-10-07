import PropTypes from 'prop-types';
import NotFound404 from './NotFound404';
import { Link, useParams } from 'react-router-dom';

const Job = ({ jobs }) => {
    const { id } = useParams();
    const job = jobs.find(x => x.id === Number(id));

    if (!job) return (<NotFound404 />);

    const { title, salary, equity, companyHandle, companyName } = job;

    return (
        <div>
            <h1>{title}</h1>
            <p>Offered by <Link to={`/companies/${companyHandle}`}>{companyName}</Link></p>
            <p>Salary: {`$${salary.toLocaleString()}`}</p>
            <p>Equity: {`${(equity * 100).toFixed(2)}%`}</p>
        </div>
    )
}

Job.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default Job;