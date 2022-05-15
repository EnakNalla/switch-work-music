import { observer } from 'mobx-react-lite';
import { Button, Table } from 'react-bootstrap';
import { useStore } from '../../../stores/ProvideStore';
import DeleteConfirm from '../../DeleteConfirm';

const NON_DELETABLE_IDS = ['30 seconds', 'Indefinite'];

const TimerTable = () => {
  const { configStore } = useStore();

  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Default</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {configStore.timers.map((t, i) => (
          <tr key={i}>
            <td>{t.name}</td>
            <td>{t.playtime / 1000} seconds</td>
            <td>
              {t.default ? (
                'True'
              ) : (
                <Button size="sm" onClick={() => configStore.changeDefaultTimer(t.name)}>
                  False
                </Button>
              )}
            </td>
            <td>
              {NON_DELETABLE_IDS.includes(t.name) ? (
                'Not allowed'
              ) : (
                <DeleteConfirm onConfirm={() => configStore.removeTimer(t)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default observer(TimerTable);
