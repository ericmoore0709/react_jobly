import PropTypes from 'prop-types';
import { List, ListGroupItem } from "reactstrap";
import JobCard from "./JobCard";

const JobsList = ({ jobs, appliedJobs, applyToJob }) => {

    console.log(appliedJobs);

    return (
        <div>
            <h1>Jobs</h1>
            <List>
                {jobs.map(x =>
                    <ListGroupItem key={x.id} >
                        <JobCard id={x.id} title={x.title} salary={x.salary} equity={x.equity} applied={(appliedJobs.includes(x.id))} applyToJob={applyToJob} />
                    </ListGroupItem>
                )}
            </List>
        </div>
    )
}

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired,
    appliedJobs: PropTypes.array,
    applyToJob: PropTypes.func.isRequired
}

export default JobsList;