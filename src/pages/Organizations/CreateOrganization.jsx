import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import organizationAPI from "../../api/organizationAPI";

export default function CreateOrganization() {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { organizationID } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        postal_code: "",
    });

    const [selectedCountry, setSelectedCountry] = useState({
        country: formData.country,
    });
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countries = Country.getAllCountries();
    const states = formData.country
        ? State.getStatesOfCountry(formData.country)
        : [];

    const cities = formData.state
        ? City.getCitiesOfState(formData.country, formData.state)
        : [];

    const handleCountryChange = (e) => {
        setSelectedCountry((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStateChange = (e) => {
        setSelectedState((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCityChange = (e) => {
        setSelectedCity((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (organizationID) {
            organizationAPI
                .getOrganizationById(authToken, organizationID)
                .then((data) => {
                    setFormData(data);
                });
        }
    }, [organizationID]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (organizationID) {
            organizationAPI
                .updateOrganizationByID(authToken, organizationID, formData)
                .then((data) => {
                    // console.log(data);
                    navigate("/organizations", {
                        state: {
                            notification: {
                                message: data.message,
                                type: data.resType,
                                show: true,
                            },
                        },
                    });
                });
        } else {
            organizationAPI
                .createOrganization(authToken, formData)
                .then((data) => {
                    // console.log(data);
                    navigate("/organizations", {
                        state: {
                            notification: {
                                message: data.message,
                                type: data.resType,
                                show: true,
                            },
                        },
                    });
                });
        }
    };

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
                                <Link to="/organizations">Organizations</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                {organizationID ? "Update" : "Create"}{" "}
                                Organization
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex justify-content-center">
                    <Card className="col-lg-8 col-md-10 col-sm-12">
                        <form onSubmit={handleFormSubmit}>
                            <Card.Header>
                                <Card.Title>
                                    {organizationID ? "Update" : "Create"}{" "}
                                    Organization
                                </Card.Title>
                                <Button className="my-2" type="submit">
                                    Save
                                </Button>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column gap-2">
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
                                <FormGroup>
                                    <FormLabel>Address</FormLabel>
                                    <div className="d-flex gap-2">
                                        <div className="col-6">
                                            <FormControl
                                                as="textarea"
                                                rows="7"
                                                value={formData?.address}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: e.target.value,
                                                    })
                                                }
                                            ></FormControl>
                                        </div>
                                        <div className="col-6 d-flex gap-2 flex-column">
                                            <FormControl
                                                as="select"
                                                onChange={handleCountryChange}
                                                name="country"
                                                value={formData?.country}
                                            >
                                                <option value="">
                                                    Select a country
                                                </option>
                                                {countries.map((country) => (
                                                    <option
                                                        key={country.isoCode}
                                                        value={country.isoCode}
                                                    >
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </FormControl>
                                            <FormControl
                                                as="select"
                                                onChange={handleStateChange}
                                                disabled={!selectedCountry}
                                                name="state"
                                                value={formData?.state}
                                            >
                                                <option value="">
                                                    Select a state
                                                </option>
                                                {states.map((state) => (
                                                    <option
                                                        key={state.isoCode}
                                                        value={state.isoCode}
                                                    >
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </FormControl>
                                            <FormControl
                                                as="select"
                                                disabled={!selectedState}
                                                onChange={handleCityChange}
                                                value={formData?.city}
                                                name="city"
                                            >
                                                <option value="">
                                                    Select a city
                                                </option>
                                                {cities.map((city) => (
                                                    <option
                                                        key={city.name}
                                                        value={city.name}
                                                    >
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </FormControl>
                                            <FormControl
                                                type="number"
                                                placeholder="Postal Code"
                                                value={formData?.postal_code}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        postal_code:
                                                            e.target.value,
                                                    })
                                                }
                                            ></FormControl>
                                        </div>
                                    </div>
                                </FormGroup>
                            </Card.Body>
                        </form>
                    </Card>
                </div>
            </main>
        </>
    );
}
