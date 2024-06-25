import React, {useState} from "react";
import PropTypes from "prop-types";

function Checklist({ checked, onChange }) {
    return (
        <input 
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
    )
}

export default Checklist;