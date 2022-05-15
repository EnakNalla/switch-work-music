import Wave from '@foobar404/wave';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useStore } from '../../stores/ProvideStore';

const Visualiser = () => {
  const { configStore, playerStore } = useStore();
  const canvasElm = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!playerStore.visualiserActive || !canvasElm.current) return;

    canvasElm.current.style.backgroundColor = configStore.colours.background;
    canvasElm.current.width = canvasElm.current.offsetWidth;
    canvasElm.current.height = canvasElm.current.offsetHeight;

    const wave = new Wave();

    wave.fromElement('audio', 'canvas', {
      type: configStore.visualiserType,
      stroke: configStore.visualiserStroke,
      colors: [
        configStore.colours.primary,
        configStore.colours.secondary,
        configStore.colours.tertiary,
        configStore.colours.quaternary
      ]
    });
  });

  if (!playerStore.visualiserActive) return null;

  return <canvas id="canvas" ref={canvasElm} />;
};

export default observer(Visualiser);
