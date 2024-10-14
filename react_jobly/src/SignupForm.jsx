import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label, List, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from 'prop-types';

const SignupForm = ({ processSignup }) => {

    const INITIAL_FORM_DATA = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState(null);

    const toSentenceCase = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        setServerError(null);

        // validate form data
        let newErrors = []

        Object.keys(formData).forEach((x) => {
            if (!formData[x]) newErrors = [...newErrors, `${toSentenceCase(x)} is required.`];
        })

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await processSignup(formData);
        } catch (err) {
            console.log(err);
            setServerError(err.message);
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup floating>
                    <Input id="firstName" name="firstName" placeholder="First Name" onChange={handleInputChange} />
                    <Label htmlFor="firstName">First Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="lastName" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
                    <Label htmlFor="lastName">Last Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="email" name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                    <Label htmlFor="email">Email</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="username" name="username" placeholder="Username" onChange={handleInputChange} />
                    <Label htmlFor="username">Username</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="password" name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                    <Label htmlFor="password">Password</Label>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" className="w-100">Sign up</Button>
                </FormGroup>
            </Form>

            {/* Show validation errors */}
            {(errors.length > 0) && (
                <List className="mt-2 px-0">
                    <ListGroup>
                        {errors.map((e, i) => (
                            <ListGroupItem key={i} color="danger">
                                {e}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </List>
            )}

            {/* Show server-side error */}
            {serverError && (
                <Alert color="danger">
                    {serverError}
                </Alert>
            )}
        </div>
    )
}

SignupForm.propTypes = {
    processSignup: PropTypes.func.isRequired
}

export default SignupForm;