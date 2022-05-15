import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface Props extends ButtonProps {
  isSubmitting: boolean;
}

const SubmitBtn = ({ isSubmitting, ...buttonProps }: Props) => {
  return (
    <Button type="submit" {...buttonProps}>
      {isSubmitting ? (
        <Spinner animation="border" size="sm">
          Loading...
        </Spinner>
      ) : (
        'Submit'
      )}
    </Button>
  );
};

export default SubmitBtn;
