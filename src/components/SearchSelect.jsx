import React from "react";
import Select from "react-select";

const SearchSelect = ({ options, onChange, onInputChange, ...props }) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            onInputChange={onInputChange}
            {...props}
            placeholder="Type to search"
        />
    );
};

export default SearchSelect;
