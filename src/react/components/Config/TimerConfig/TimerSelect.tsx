import { observer } from 'mobx-react-lite';
import { FloatingLabel, FormSelect } from 'react-bootstrap';
import { useStore } from '../../../stores/ProvideStore';

const TimerSelect = () => {
  const { configStore, playerStore } = useStore();

  return (
    <FloatingLabel label={<label htmlFor="timer-select">Current timer</label>} className="mb-2">
      <FormSelect value={playerStore.timer.name} onChange={playerStore.setTimer} id="timer-select">
        {configStore.timers.map((t, i) => (
          <option value={t.name} key={i}>
            {t.name}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default observer(TimerSelect);
