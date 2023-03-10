import "./form-input.styles.scss";

// spread our custom values into the form input
const FormInput = ({ label, ...otherProps }) => {
    return (
  <div className="group">
    <input className="form-input" {...otherProps} />
    {label && ( // if label exists, render
      <label
        className={`${
          otherProps.value.length ? "shrink" : "" // check if otherProps has a value(user entered input)  and apply shrink class. Otherwise apply an empty string
        } form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
  );
};

export default FormInput;
