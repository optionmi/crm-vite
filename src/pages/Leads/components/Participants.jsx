import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import contactsAPI from "../../../api/contactsAPI";
import AuthContext from "../../../context/AuthContext";

const Participants = () => {
    const [options, setOptions] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { authToken } = useContext(AuthContext);

    const handleChange = (selectedOptions) => {
        // Separate selected contacts and users
        const contacts = selectedOptions.filter(
            (option) => option.type === "contact"
        );
        const users = selectedOptions.filter(
            (option) => option.type === "user"
        );

        setSelectedContacts(contacts.map((contact) => contact.value));
        setSelectedUsers(users.map((user) => user.value));
    };

    const handleInputChange = async (term) => {
        console.log(term);
        const contactsResponse = await contactsAPI.getContactByName(
            authToken,
            term
        );
        const usersResponse = await axios.get(
            `http://localhost:8000/api/users?search=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        const contactsOptions = contactsResponse.data?.map((contact) => ({
            value: contact.id,
            label: contact.name,
            type: "contact",
        }));

        const usersOptions = usersResponse.data?.map((user) => ({
            value: user.id,
            label: user.name,
            type: "user",
        }));

        setOptions([...contactsOptions, ...usersOptions]);
    };

    return (
        <Select
            isMulti
            options={options}
            onInputChange={handleInputChange}
            onChange={handleChange}
            placeholder="Type to search"
        />
    );
};

export default Participants;
