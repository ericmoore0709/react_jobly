import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { List, ListGroupItem } from "reactstrap";

const JobsList = ({ jobs }) => {
    return (
        <div>
            <h1>Jobs</h1>
            <List>
                {jobs.map(x =>
                    <ListGroupItem key={x.id} ><Link to={`/jobs/${x.id}`}>{x.title}</Link></ListGroupItem>
                )}
            </List>
        </div>
    )
}

JobsList.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default JobsList;