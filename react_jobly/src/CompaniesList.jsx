import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { List, ListGroupItem } from "reactstrap";

const CompaniesList = ({ companies }) => {
    return (
        <div>
            <h1>Companies</h1>
            <List>
                {companies.map(x =>
                    <ListGroupItem key={x.handle} ><Link to={`/companies/${x.handle}`}>{x.name}</Link></ListGroupItem>
                )}
            </List>
        </div>
    )
}

CompaniesList.propTypes = {
    companies: PropTypes.array.isRequired
}

export default CompaniesList;