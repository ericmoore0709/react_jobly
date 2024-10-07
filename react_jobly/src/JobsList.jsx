import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const JobsList = ({ jobs }) => {
    return (
        <div>
            <h1>Jobs</h1>
            <ul>
                {jobs.map(x =>
                    <li key={x.id} ><Link to={`/jobs/${x.id}`}>{x.title}</Link></li>
                )}
            </ul>
        </div>
    )
}

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default JobsList;