import { useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';

interface Props extends FormControlProps {
  name: string;
  label: string;
}

const TextInput = ({ name, label, ...formControlProps }: Props) => {
  const [field, meta] = useField(name);

  return (
    <Form.Floating>
      <Form.Control
        {...formControlProps}
        {...field}
        isInvalid={meta.touched && !!meta.error}
        id={name}
      />
      <Form.Label htmlFor={name}>{label}</Form.Label>
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      ) : null}
    </Form.Floating>
  );
};

export default TextInput;
