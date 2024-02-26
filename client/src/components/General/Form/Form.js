
import React, { useState, useEffect } from "react";
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
    <>
        <form className="form" onSubmit={handleSubmit}>
            {fields.map(field => {
                if (field.type === 'textarea') {
                    return (
                        <textarea
                            className="form-input"
                            key={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            value={formData[field.name] || ''}
                            rows={field.rows || 3} // Use the rows attribute from field definition, defaulting to 3 if not specified
                        />
                    );
                } else {
                    return (
                        <input
                            className="form-input"
                            key={field.name}
                            type={field.type || 'text'}
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            value={formData[field.name] || ''}
                        />
                    );
                }
            })}
            
    <button onSubmit={handleSubmit} className="btn-submit" type="submit">Submit</button>
        </form>
    </>
    );
};

export default Form;