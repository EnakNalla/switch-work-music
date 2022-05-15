import React from 'react';
import * as yup from 'yup';
import { useStore } from '../../../stores/ProvideStore';
import Checkbox from '../../Form/Checkbox';
import ModalForm from '../../Form/ModalForm';
import TextInput from '../../Form/TextInput';

const CreateTimer = () => {
  const { configStore } = useStore();

  return (
    <ModalForm
      initialValues={{ name: '', playtime: 0, default: false, error: null }}
      onSubmit={configStore.addTimer}
      title="Add timer"
      validationSchema={yup.object({
        name: yup.string().required(),
        playtime: yup.number().positive()
      })}
    >
      <TextInput name="name" label="Timer name" className="mb-2" />
      <TextInput name="playtime" label="Playtime in seconds" type="number" className="mb-2" />
      <Checkbox name="default" label="Default" />
    </ModalForm>
  );
};

export default CreateTimer;
