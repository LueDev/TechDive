import React, { useState } from "react";
import './Form.css'

function Form({ onSubmit, fields}) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

return (
    <form className="form" onSubmit={handleSubmit}>
        {fields.map(field => (
            <input className="form-input"
                key={field.name}
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                placeholder={field.placeholder}
                onChange={handleChange}
            />
        ))}

        <button className="btn-submit" type="submit" >submit</button>
    </form>
    );
};

export default Form;