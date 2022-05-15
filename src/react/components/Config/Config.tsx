import { Tab, Tabs } from 'react-bootstrap';
import TimerConfig from './TimerConfig/TimerConfig';

const Config = () => {
  return (
    <>
      <h3>Config</h3>
      <Tabs defaultActiveKey="timers">
        <Tab eventKey="timers" title="Timers">
          <TimerConfig />
        </Tab>
      </Tabs>
    </>
  );
};

export default Config;
