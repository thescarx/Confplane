import React from "react";
import "./Form.css";
function Form1({ formData, setFormData, formErrors, setFormErrors }) {
  return (
    <div className="form2">
      {formErrors.firstname ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.firstname}
          name="firstname"
          value={formData.firstname}
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="First name"
          name="firstname"
          value={formData.firstname}
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
        />
      )}
      {formErrors.familyname ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.familyname}
          value={formData.familyname}
          onChange={(e) => {
            setFormData({ ...formData, familyname: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="Family name"
          value={formData.familyname}
          onChange={(e) => {
            setFormData({ ...formData, familyname: e.target.value });
          }}
        />
      )}
      {formErrors.email ? (
        <input
          className="form_inputs1"
          type="email"
          placeholder={formErrors.email}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      )}
      {formErrors.password ? (
        <input
          className="form_inputs1"
          type="password"
          placeholder={formErrors.password}
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      )}
      {formErrors.passwordconfirmation ? (
        <input
          className="form_inputs1"
          type="password"
          placeholder={formErrors.passwordconfirmation}
          value={formData.passwordconfirmation}
          onChange={(e) => {
            setFormData({ ...formData, passwordconfirmation: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="password"
          placeholder="Password confirmation"
          value={formData.passwordconfirmation}
          onChange={(e) => {
            setFormData({ ...formData, passwordconfirmation: e.target.value });
          }}
        />
      )}
    </div>
  );
}

export default Form1;
