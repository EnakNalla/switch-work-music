import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { render, screen } from '../../test-utils/rtl';
import Checkbox from './Checkbox';
import ModalForm from './ModalForm';
import TextInput from './TextInput';

describe('<ModalForm />', () => {
  it('should call onSubmit with form values', async () => {
    const onSubmit = jest.fn();
    render(
      <ModalForm
        initialValues={{ test: '', check: false, error: null }}
        onSubmit={v => onSubmit(v)}
        title="test form"
      >
        <TextInput name="test" label="Test" />
        <Checkbox name="check" label="Check" />
      </ModalForm>,
      {}
    );

    await userEvent.click(screen.getByRole('button', { name: 'test form' }));

    await userEvent.type(screen.getByLabelText('Test'), 'testing');
    await userEvent.click(screen.getByLabelText('Check'));

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith({ test: 'testing', check: true, error: null });
  });

  it('should render <TextInput /> validation error', async () => {
    render(
      <ModalForm
        initialValues={{ test: '', check: false, error: null }}
        onSubmit={jest.fn()}
        title="test form"
        validationSchema={yup.object({
          test: yup.string().required()
        })}
      >
        <TextInput name="test" label="Test" />
        <Checkbox name="check" label="Check" />
      </ModalForm>,
      {}
    );

    await userEvent.click(screen.getByRole('button', { name: 'test form' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('test is a required field')).toBeInTheDocument();
  });

  it('should render error thrown from onSubmit', async () => {
    render(
      <ModalForm
        initialValues={{ test: '', check: false, error: null }}
        onSubmit={jest.fn().mockRejectedValue(new Error('test error'))}
        title="test form"
      >
        <TextInput name="test" label="Test" />
        <Checkbox name="check" label="Check" />
      </ModalForm>,
      {}
    );

    await userEvent.click(screen.getByRole('button', { name: 'test form' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('test error')).toBeInTheDocument();
  });
});
