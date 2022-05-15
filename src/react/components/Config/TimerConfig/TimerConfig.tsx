import CreateTimer from './CreateTimer';
import TimerSelect from './TimerSelect';
import TimerTable from './TimerTable';

const TimerConfig = () => {
  return (
    <div className="bg-white p-1 text-center">
      <TimerSelect />

      <TimerTable />

      <CreateTimer />
    </div>
  );
};

export default TimerConfig;
