import { Alert, Button, Form, FormGroup, Input, Label, List, ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import JoblyApi from "../api";

const ProfileForm = ({ updateUser, username }) => {

    const INITIAL_FORM_DATA = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: ''
    }

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const user = await JoblyApi.getCurrentUser(username);
                setFormData({
                    username: username || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    password: ''
                });
            } catch (err) {
                console.log(err);
                setServerError("Unable to load user data.");
            }
        };

        getUserDetails();
    }, [username]);

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
            if (!formData[x] && x !== 'password') newErrors = [...newErrors, `${toSentenceCase(x)} is required.`];
        })

        if (formData.password && formData.password.length < 5) {
            newErrors = [...newErrors, "Password must be at least 5 characters."];
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        // Prepare the data to send to the API
        const dataToSubmit = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        if (formData.password.length >= 5) {
            dataToSubmit.password = formData.password;
        }

        try {
            await updateUser(dataToSubmit);
        } catch (err) {
            console.log(err);
            setServerError(err.message);
        }

    }

    return (
        <div>
            <h1>Profile</h1>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup floating>
                    <Input id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                    <Label htmlFor="firstName">First Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                    <Label htmlFor="lastName">Last Name</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    <Label htmlFor="email">Email</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="password" name="password" placeholder="New Password" value={formData.password} onChange={handleInputChange} />
                    <Label htmlFor="password">Change Password</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="username" name="username" placeholder="Username" value={formData.username} disabled />
                    <Label htmlFor="username">Username</Label>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" className="w-100">Update profile</Button>
                </FormGroup>
            </Form>

            {/* Show validation errors */}
            {(errors.length > 0) && (
                <List id="validation-errors" className="mt-2 px-0">
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
                <Alert id='server-error' color="danger">
                    {serverError}
                </Alert>
            )}
        </div>
    )
}

ProfileForm.propTypes = {
    updateUser: PropTypes.func.isRequired,
    username: PropTypes.string
}

export default ProfileForm;