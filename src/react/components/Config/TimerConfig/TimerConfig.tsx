import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/ProvideStore';
import CreateTimer from './CreateTimer';
import TimerSelect from './TimerSelect';
import TimerTable from './TimerTable';

const TimerConfig = () => {
  const { configStore, playerStore } = useStore();

  return (
    <div className="bg-white p-1">
      <TimerSelect />

      <TimerTable />

      <CreateTimer />
    </div>
  );
};

export default observer(TimerConfig);
