import PropTypes from 'prop-types';
import NotFound404 from './NotFound404';
import { useParams } from 'react-router-dom';

const Job = ({ jobs }) => {
    const { id } = useParams();
    const job = jobs.find(x => x.id === Number(id));

    if (!job) return (<NotFound404 />);

    const { title } = job;

    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

Job.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default Job;