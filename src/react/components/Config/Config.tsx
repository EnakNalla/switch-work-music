import { Tab, Tabs } from 'react-bootstrap';
import SavedConfigs from './SavedConfigs/SavedConfigs';
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

        <Tab eventKey="configs" title="Saved configs">
          <SavedConfigs />
        </Tab>
      </Tabs>
    </>
  );
};

export default Config;
