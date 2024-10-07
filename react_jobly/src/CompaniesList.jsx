import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CompaniesList = ({ companies }) => {

    return (
        <div>
            <h1>Companies</h1>
            <ul>
                {companies.map(x =>
                    <li key={x.handle} ><Link to={`/companies/${x.handle}`}>{x.name}</Link></li>
                )}
            </ul>
        </div>
    )
}

CompaniesList.propTypes = {
    companies: PropTypes.array.isRequired
}

export default CompaniesList;