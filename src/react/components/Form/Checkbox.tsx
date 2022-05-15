import { useField } from 'formik';
import { FormCheck } from 'react-bootstrap';

interface Props {
  name: string;
  label: string;
}

const Checkbox = ({ name, label }: Props) => {
  const [field] = useField(name);

  return <FormCheck label={label} id={name} {...field} />;
};

export default Checkbox;
