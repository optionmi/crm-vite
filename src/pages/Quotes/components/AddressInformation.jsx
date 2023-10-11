import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import { useState } from "react";

export default function AddressInformation({ formData, setFormData }) {
    const [selectedCountry, setSelectedCountry] = useState({
        billing_country: formData.billing_country,
        shipping_country: formData.shipping_country,
    });
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countries = Country.getAllCountries();
    const billing_states = formData.billing_country
        ? State.getStatesOfCountry(formData.billing_country)
        : [];
    const shipping_states = formData.shipping_country
        ? State.getStatesOfCountry(formData.shipping_country)
        : [];

    const billing_cities = formData.billing_state
        ? City.getCitiesOfState(
              formData.billing_country,
              formData.billing_state
          )
        : [];
    const shipping_cities = formData.shipping_state
        ? City.getCitiesOfState(
              formData.shipping_country,
              formData.shipping_state
          )
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

    return (
        <div className="d-flex flex-column gap-3">
            <FormGroup>
                <FormLabel>Billing Address</FormLabel>
                <div className="d-flex gap-2">
                    <div className="col-6">
                        <FormControl
                            as="textarea"
                            rows="7"
                            value={formData?.billing_address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    billing_address: e.target.value,
                                })
                            }
                        ></FormControl>
                    </div>
                    <div className="col-6 d-flex gap-2 flex-column">
                        <FormControl
                            as="select"
                            onChange={handleCountryChange}
                            name="billing_country"
                            value={formData?.billing_country}
                        >
                            <option value="">Select a country</option>
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
                            name="billing_state"
                            value={formData?.billing_state}
                        >
                            <option value="">Select a state</option>
                            {billing_states.map((state) => (
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
                            value={formData?.billing_city}
                            name="billing_city"
                        >
                            <option value="">Select a city</option>
                            {billing_cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </FormControl>
                        <FormControl
                            type="number"
                            placeholder="Postal Code"
                            value={formData?.billing_postal_code}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    billing_postal_code: e.target.value,
                                })
                            }
                        ></FormControl>
                    </div>
                </div>
            </FormGroup>

            <FormGroup>
                <FormLabel>Shipping Address</FormLabel>
                <div className="d-flex gap-2">
                    <div className="col-6">
                        <FormControl
                            as="textarea"
                            rows="7"
                            value={formData?.shipping_address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    shipping_address: e.target.value,
                                })
                            }
                        ></FormControl>
                    </div>
                    <div className="col-6 d-flex gap-2 flex-column">
                        <FormControl
                            as="select"
                            onChange={handleCountryChange}
                            name="shipping_country"
                            value={formData?.shipping_country}
                        >
                            <option value="">Select a country</option>
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
                            name="shipping_state"
                            value={formData?.shipping_state}
                        >
                            <option value="">Select a state</option>
                            {shipping_states.map((state) => (
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
                            name="shipping_city"
                            value={formData?.shipping_city}
                        >
                            <option value="">Select a city</option>
                            {shipping_cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </FormControl>
                        <FormControl
                            type="number"
                            placeholder="Postal Code"
                            value={formData?.shipping_postal_code}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    shipping_postal_code: e.target.value,
                                })
                            }
                        ></FormControl>
                    </div>
                </div>
            </FormGroup>
        </div>
    );
}
