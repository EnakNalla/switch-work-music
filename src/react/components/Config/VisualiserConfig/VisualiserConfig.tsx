import { observer } from 'mobx-react-lite';
import { Button, FloatingLabel, FormCheck, FormControl, FormSelect } from 'react-bootstrap';
import { useStore } from '../../../stores/ProvideStore';

const VisualiserConfig = () => {
  const { configStore } = useStore();

  return (
    <div className="bg-white p-1">
      <FormCheck
        checked={configStore.useVisualiser}
        id="use-visualiser-check"
        label="Enabled"
        onChange={configStore.toggleUseVisualiser}
      />

      <FloatingLabel label={<label htmlFor="visualiser-type-select">Type</label>} className="mb-2">
        <FormSelect
          value={configStore.visualiserType}
          onChange={configStore.setVisualiserType}
          id="visualiser-type-select"
        >
          <option value="cubes">cubes</option>
          <option value="bars">bars</option>
          <option value="bars blocks">bars blocks</option>
          <option value="dualbars">dualbars</option>
          <option value="dualbars blocks">dualbars blocks</option>
          <option value="fireworks">fireworks</option>
          <option value="flower">flower</option>
          <option value="flower blocks">flower blocks</option>
          <option value="orbs">orbs</option>
          <option value="ring">ring</option>
          <option value="round wave">round wave</option>
          <option value="shockwave">shockwave</option>
          <option value="shine">shine</option>
          <option value="star">star</option>
          <option value="static">static</option>
          <option value="stitches">stitches</option>
          <option value="web">web</option>
          <option value="wave">wave</option>
        </FormSelect>
      </FloatingLabel>

      <FloatingLabel
        label={<label htmlFor="visualiser-stroke-select">Stroke</label>}
        className="mb-2"
      >
        <FormSelect
          value={configStore.visualiserStroke}
          onChange={configStore.setVisualiserStroke}
          id="visualiser-stroke-select"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
        </FormSelect>
      </FloatingLabel>

      <div className="d-flex justify-content-between">
        <h5 className="pt-2">Colours</h5>

        <Button variant="warning" onClick={configStore.resetColours}>
          Reset
        </Button>
      </div>

      <FloatingLabel label={<label htmlFor="primary-colour">Primary</label>}>
        <FormControl
          id="primary-colour"
          className="w-100 mt-2"
          type="color"
          value={configStore.colours.primary}
          onChange={e => configStore.setColour('primary', e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label={<label htmlFor="secondary-colour">Secondary</label>}>
        <FormControl
          id="secondary-colour"
          className="w-100 mt-2"
          type="color"
          value={configStore.colours.secondary}
          onChange={e => configStore.setColour('secondary', e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label={<label htmlFor="tertiary-colour">Tertiary</label>}>
        <FormControl
          id="tertiary-colour"
          className="w-100 mt-2"
          type="color"
          value={configStore.colours.tertiary}
          onChange={e => configStore.setColour('tertiary', e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label={<label htmlFor="quaternary-colour">Quaternary</label>}>
        <FormControl
          id="quaternary-colour"
          className="w-100 mt-2"
          type="color"
          value={configStore.colours.quaternary}
          onChange={e => configStore.setColour('quaternary', e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label={<label htmlFor="background-colour">Background</label>}>
        <FormControl
          id="background-colour"
          className="w-100 mt-2"
          type="color"
          value={configStore.colours.background}
          onChange={e => configStore.setColour('background', e.target.value)}
        />
      </FloatingLabel>
    </div>
  );
};

export default observer(VisualiserConfig);
