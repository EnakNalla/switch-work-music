import { observer } from 'mobx-react-lite';
import { Button, Table } from 'react-bootstrap';
import * as yup from 'yup';
import { useStore } from '../../../stores/ProvideStore';
import DeleteConfirm from '../../DeleteConfirm';
import ModalForm from '../../Form/ModalForm';
import TextInput from '../../Form/TextInput';

const SavedConfigs = () => {
  const { configStore } = useStore();

  return (
    <div className="bg-white p-1 text-center">
      {configStore.loadedConfig && <h4>Current: {configStore.loadedConfig}</h4>}

      <Table bordered responsive>
        <tbody>
          {configStore.savedConfigs.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>
                <Button size="sm" variant="success" onClick={() => configStore.loadConfig(c)}>
                  Load
                </Button>
              </td>
              <td>
                <Button
                  size="sm"
                  onClick={() => configStore.createConfig({ name: c.name, update: true })}
                >
                  Update
                </Button>
              </td>
              <td>
                <DeleteConfirm onConfirm={() => configStore.deleteConfig(c.name)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalForm
        title="Save config"
        initialValues={{ name: '', error: null }}
        onSubmit={configStore.createConfig}
        validationSchema={yup.object({ name: yup.string().required() })}
      >
        <TextInput name="name" label="Config name" />
      </ModalForm>
    </div>
  );
};

export default observer(SavedConfigs);
