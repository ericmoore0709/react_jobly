import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const CompanyCard = ({ handle, name, description }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle className="mb-3">
                    <Link to={`/companies/${handle}`}>{name}</Link>
                </CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    )
}

CompanyCard.propTypes = {
    handle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default CompanyCard;