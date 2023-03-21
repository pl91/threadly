import { FormInputLabel, Input, Group } from "./form-input.styles";

// spread our custom values into the form input
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && ( // if label exists, render
        <FormInputLabel
          shrink={otherProps.value.length} // shrink is only applied if a value exists(truthy)
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
