import PropTypes from 'prop-types';
import { List, ListGroupItem } from "reactstrap";
import JobCard from "./JobCard";

const JobsList = ({ jobs }) => {
    return (
        <div>
            <h1>Jobs</h1>
            <List>
                {jobs.map(x =>
                    <ListGroupItem key={x.id} >
                        <JobCard id={x.id} title={x.title} salary={x.salary} equity={x.equity} />
                    </ListGroupItem>
                )}
            </List>
        </div>
    )
}

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default JobsList;