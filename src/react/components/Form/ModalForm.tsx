import { ErrorMessage, Formik } from 'formik';
import { ReactNode, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import SubmitBtn from './SubmitBtn';

type FormValues<T> = T & { error: any };

interface Props<T> {
  title: string;
  initialValues: FormValues<T>;
  children: ReactNode;
  onSubmit(values: FormValues<T>): Promise<void> | void;
  validationSchema?: any;
}

const ModalForm = <T,>(props: Props<T>) => {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);

  return (
    <>
      <Button type="button" onClick={() => setShow(true)}>
        {props.title}
      </Button>
      <Formik
        initialValues={props.initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            await props.onSubmit(values);
            close();
          } catch (e: any) {
            setErrors({ error: e.message });
          }
        }}
        validationSchema={props.validationSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Modal show={show} onHide={close}>
            <Modal.Header closeButton>{props.title}</Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <ErrorMessage
                  name="error"
                  render={error => <Alert variant="danger">{error}</Alert>}
                />
                {props.children}
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" onClick={close} variant="secondary">
                  Cancel
                </Button>
                <SubmitBtn variant="success" isSubmitting={isSubmitting} />
              </Modal.Footer>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default ModalForm;
