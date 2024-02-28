
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
    <div className='form-cont'>
        <form className="form" onSubmit={onSubmit}> 
            {fields.map(field => {
                const fieldError = formik.touched[field.name] && formik.errors[field.name];
                    return (
                        <div key={field.name} className='form-fields'>
                        {field.type === 'textarea' ? ( //if (field.type === 'textarea')
                            <textarea
                                className="form-input"
                                key={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field.name]}//formData[field.name] || ''}
                                rows={field.rows || 3} // Use the rows attribute from field definition, defaulting to 3 if not specified
                            />
                        ): (
                            <input
                                className="form-input"
                                key={field.name}
                                type={field.type || 'text'}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[field.name] || ''}
                        />
                        )}

                        {fieldError && <div className='formik-error'>{formik.errors[field.name]}</div>}
                        </div>
                    );
                }
            })}
            
    <button onSubmit={handleSubmit} className="btn-submit" type="submit">Submit</button>
        </form>
    </>
    );
}

export default Form;