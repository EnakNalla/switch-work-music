import { Tab, Tabs } from 'react-bootstrap';
import TimerConfig from './TimerConfig/TimerConfig';
import VisualiserConfig from './VisualiserConfig/VisualiserConfig';

const Config = () => {
  return (
    <>
      <h3 className="text-center">Config</h3>
      <Tabs defaultActiveKey="timers">
        <Tab eventKey="timers" title="Timers">
          <TimerConfig />
        </Tab>

        <Tab eventKey="visualiser" title="Visualiser config">
          <VisualiserConfig />
        </Tab>
      </Tabs>
    </>
  );
};

export default Config;
