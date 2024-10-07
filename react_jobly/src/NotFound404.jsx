import { Link } from "react-router-dom";

const NotFound404 = () => {

    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>Whatever you&apos;re looking for, we don&apos;t have it.</p>
            <Link to={'/'}>Go home</Link>
        </div>
    )
}

export default NotFound404;