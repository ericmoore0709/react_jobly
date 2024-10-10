import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, token }) => {
    return (
        <>
            {(token) ? element : <Navigate to={'/login'} />}
        </>
    );
}

PrivateRoute.propTypes = {
    element: PropTypes.any.isRequired,
    token: PropTypes.string
}

export default PrivateRoute;