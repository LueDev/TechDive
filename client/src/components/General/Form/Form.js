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

    


  /* Divide fields into two groups
  const half = Math.ceil(fields.length / 2);
  const firstHalfFields = fields.slice(0, half);
  const secondHalfFields = fields.slice(half);
*/
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
        </form>
    <button onSubmit={handleSubmit} className="btn-submit" type="submit">Submit</button>
    </>
    );
};

export default Form;