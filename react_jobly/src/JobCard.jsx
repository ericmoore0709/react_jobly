import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';

const JobCard = ({ id, title, salary, equity }) => {
    return (
        <Card style={{ textAlign: 'center' }}>
            <CardBody>
                <CardTitle className="mb-3">{title}</CardTitle>
                <CardText>Salary: {salary ? `$${salary.toLocaleString()}` : 'none'}</CardText>
                <CardText>Equity: {equity ? `${(equity * 100).toFixed(2)}%` : 'none'}</CardText>
                <Button key={id}>Apply</Button>
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