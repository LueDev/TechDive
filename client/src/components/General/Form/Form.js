/*import React from 'react';
import './Form.css';

function Form({ formik, fields }) {
    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            {fields.map(field => {
                const fieldError = formik.touched[field.name] && formik.errors[field.name];
                return (
                    <div key={field.name}>
                        {field.type === 'textarea' ? (
                            <textarea
                                className="form-input"
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field.name]}
                                rows={field.rows || 3}
                            />
                        ) : (
                            <input
                                className="form-input"
                                type={field.type || 'text'}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field.name]}
                            />
                        )}
                        {fieldError && <div className="error">{formik.errors[field.name]}</div>}
                    </div>
                );
            })}
            <button className="btn-submit" type="submit">Submit</button>
        </form>
    );
};

export default Form;
*/

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