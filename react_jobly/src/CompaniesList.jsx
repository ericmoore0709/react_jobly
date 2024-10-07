import PropTypes from 'prop-types';
import { Input, List, ListGroupItem } from "reactstrap";
import { useEffect, useState } from "react";
import JoblyApi from '../api';
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies: initialCompanies }) => {

    const [companies, setCompanies] = useState(initialCompanies);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch filtered companies based on the search query
    useEffect(() => {
        const getFilteredCompanies = async () => {
            try {
                const queryParams = { name: searchQuery };
                const filteredCompanies = await JoblyApi.getCompaniesByQuery(queryParams);
                setCompanies(filteredCompanies);
            } catch (error) {
                console.error("Error fetching filtered companies:", error);
            }
        };

        // If there's a search query, fetch filtered companies; otherwise, use initial data
        if (searchQuery) {
            getFilteredCompanies();
        } else {
            // Reset to initial companies if search is cleared
            setCompanies(initialCompanies);
        }
    }, [searchQuery, initialCompanies]); // Trigger on searchQuery or initial companies change


    return (
        <div>
            <h1>Companies</h1>
            <Input
                type="text"
                placeholder="Search for companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <List>
                {companies.map(x => (
                    <ListGroupItem key={x.handle}>
                        <CompanyCard handle={x.handle} name={x.name} description={x.description} />
                    </ListGroupItem>
                ))}
            </List>
        </div>
    );
}

CompaniesList.propTypes = {
    companies: PropTypes.array.isRequired
}

export default CompaniesList;