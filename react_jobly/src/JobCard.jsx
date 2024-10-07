import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const JobCard = ({ id, title, salary, equity }) => {
    return (
        <Card style={{ textAlign: 'center' }}>
            <CardBody>
                <CardTitle className="mb-3">
                    <Link to={`/jobs/${id}`}>{title}</Link>
                </CardTitle>
                <CardText>Salary: {salary ? `$${salary.toLocaleString()}` : 'none'}</CardText>
                <CardText>Equity: {equity ? `${(equity * 100).toFixed(2)}%` : 'none'}</CardText>
            </CardBody>
        </Card>
    )
}

JobCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    salary: PropTypes.number,
    equity: PropTypes.string
}

export default JobCard;