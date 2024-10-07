import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import NotFound404 from "./NotFound404";

const Company = ({ companies }) => {

    const { handle } = useParams();
    const company = companies.find(x => x.handle === handle);

    if (!company) return (<NotFound404 />);

    const { name, description, numEmployees, logoUrl } = company;

    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <img src={logoUrl} width={'200px'} />
            <p><strong>{numEmployees} employees</strong> work here</p>
        </div>
    )
}

Company.propTypes = {
    companies: PropTypes.array.isRequired
}

export default Company;