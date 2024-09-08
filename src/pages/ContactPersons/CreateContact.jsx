import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import contactsAPI from "../../api/contactsAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import SearchSelect from "../../components/SearchSelect";
import organizationAPI from "../../api/organizationAPI";

export default function CreateContact() {
    const { authToken } = useContext(AuthContext);
    const { contactID } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        emails: [{ email: "", label: "" }],
        contact_numbers: [{ number: "", label: "" }],
        organization_id: "",
        removed_emails: [],
        removed_contacts: [],
    });

    useEffect(() => {
        if (contactID) {
            try {
                contactsAPI
                    .getContactById(authToken, contactID)
                    .then((data) => {
                        console.log(data);
                        setFormData(data);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }, [contactID]);

    const handleAddMoreEmail = (e) => {
        const emailsArr = [...formData.emails, { email: "", label: "" }];
        setFormData((prevFormData) => ({ ...prevFormData, emails: emailsArr }));
    };

    const handleAddMoreNumber = (e) => {
        const contact_numbersArr = [
            ...formData.contact_numbers,
            { number: "", label: "" },
        ];
        setFormData((prevFormData) => ({
            ...prevFormData,
            contact_numbers: contact_numbersArr,
        }));
    };

    const handleRemoveEmail = (e, index) => {
        const emailsArr = formData.emails;
        let removed_emailsArr = formData.removed_emails
            ? [...formData.removed_emails]
            : [];
        removed_emailsArr.push(emailsArr[index].id);
        emailsArr.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            emails: emailsArr,
            removed_emails: removed_emailsArr,
        }));
    };

    const handleRemoveNumber = (e, index) => {
        const contact_numbersArr = formData.contact_numbers;
        let removed_contactsArr = formData.removed_contacts
            ? [...formData.removed_contacts]
            : [];
        removed_contactsArr.push(contact_numbersArr[index].id);
        contact_numbersArr.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            contact_numbers: contact_numbersArr,
            removed_contacts: removed_contactsArr,
        }));
    };

    const handleEmailLabelChange = (e, index) => {
        let emailsArr = formData.emails;
        emailsArr[index].label = e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, emails: emailsArr }));
    };

    const handleEmailChange = (e, index) => {
        let emailsArr = formData.emails;
        emailsArr[index].email = e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, emails: emailsArr }));
    };

    const handleNumberLabelChange = (e, index) => {
        const contact_numbersArr = formData.contact_numbers;
        contact_numbersArr[index].label = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            contact_numbers: contact_numbersArr,
        }));
    };
    const handleNumberChange = (e, index) => {
        const contact_numbersArr = formData.contact_numbers;
        contact_numbersArr[index].number = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            contact_numbers: contact_numbersArr,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = contactID
                ? await contactsAPI.updateContactByID(
                      authToken,
                      contactID,
                      formData
                  )
                : await contactsAPI.createContact(authToken, formData);

            if (data.resType === "success") {
                navigate("/contact-persons", {
                    state: {
                        notification: {
                            message: data.message,
                            type: data.resType,
                            show: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Organization
    const [organizationOptions, setOrganizationOptions] = useState([]);
    const handleOrganizationInputChange = (inputValue) => {
        if (inputValue.length > 1) {
            try {
                organizationAPI
                    .getOrganizationByName(authToken, inputValue)
                    .then((data) => {
                        // console.log(data);
                        const organizationOptions = data.organizations?.map(
                            (org) => ({
                                label: org.name,
                                value: org.id,
                            })
                        );
                        setOrganizationOptions(organizationOptions);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleOrganizationChange = (selectedOption) => {
        console.log(selectedOption);
        setFormData((prevFormData) => ({
            ...prevFormData,
            organization_id: selectedOption.value,
        }));
    };

    // End Organization

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="d-flex justify-content-between my-2 align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/contact-persons">
                                    Contact Persons
                                </Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                {contactID ? "Update" : "Create"} Contact
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex justify-content-center">
                    <Card className="col-lg-8 col-md-10 col-sm-12">
                        <form onSubmit={handleFormSubmit}>
                            <Card.Header>
                                <Card.Title>
                                    {contactID ? "Update" : "Create"} Contact
                                </Card.Title>
                                <div className="d-flex align-items-center gap-3">
                                    <Button className="my-2" type="submit">
                                        Save
                                    </Button>
                                    <Link to="/contact-persons">Back</Link>
                                </div>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column gap-4">
                                <FormGroup>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        value={formData?.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    ></FormControl>
                                </FormGroup>

                                <FormGroup className="d-flex gap-2 flex-column">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <FormLabel>Emails</FormLabel>

                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={handleAddMoreEmail}
                                        >
                                            + Add More
                                        </Button>
                                    </div>
                                    {formData.emails.map((email, index) => (
                                        <div
                                            className="d-flex gap-2 align-items-center"
                                            key={index}
                                        >
                                            <FormControl
                                                className="w-25"
                                                as="select"
                                                value={email.label}
                                                onChange={(e) =>
                                                    handleEmailLabelChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            >
                                                <option value="WORK">
                                                    WORK
                                                </option>
                                                <option value="HOME">
                                                    HOME
                                                </option>
                                            </FormControl>
                                            <FormControl
                                                placeholder="Enter Email"
                                                required
                                                type="email"
                                                value={email.email}
                                                onChange={(e) =>
                                                    handleEmailChange(e, index)
                                                }
                                            ></FormControl>
                                            {formData.emails.length > 1 && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={(e) =>
                                                        handleRemoveEmail(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </FormGroup>

                                <FormGroup className="d-flex gap-2 flex-column">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <FormLabel>Contact Numbers </FormLabel>

                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={handleAddMoreNumber}
                                        >
                                            + Add More
                                        </Button>
                                    </div>
                                    {formData.contact_numbers.map(
                                        (number, index) => (
                                            <div
                                                className="d-flex gap-2 align-items-center"
                                                key={index}
                                            >
                                                <FormControl
                                                    className="w-25"
                                                    as="select"
                                                    value={number.label}
                                                    onChange={(e) =>
                                                        handleNumberLabelChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <option value="WORK">
                                                        WORK
                                                    </option>
                                                    <option value="HOME">
                                                        HOME
                                                    </option>
                                                </FormControl>
                                                <FormControl
                                                    placeholder="Enter Contact Number"
                                                    required
                                                    type="number"
                                                    value={number.number}
                                                    onChange={(e) =>
                                                        handleNumberChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                ></FormControl>
                                                {formData.contact_numbers
                                                    .length > 1 && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={(e) =>
                                                            handleRemoveNumber(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>Organization</FormLabel>
                                    {contactID ? (
                                        <SearchSelect
                                            value={{
                                                label: formData.organization
                                                    ?.name,
                                                value: formData.organization
                                                    ?.id,
                                            }}
                                            onInputChange={
                                                handleOrganizationInputChange
                                            }
                                            options={organizationOptions}
                                            onChange={handleOrganizationChange}
                                        />
                                    ) : (
                                        <SearchSelect
                                            onInputChange={
                                                handleOrganizationInputChange
                                            }
                                            options={organizationOptions}
                                            onChange={handleOrganizationChange}
                                        />
                                    )}
                                </FormGroup>
                            </Card.Body>
                        </form>
                    </Card>
                </div>
            </main>
        </>
    );
}
