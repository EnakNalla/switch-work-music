import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useStore } from '../../stores/ProvideStore';

const AudioPlayer = () => {
  const { playerStore } = useStore();
  const audioElm = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return playerStore.setupPlayer(audioElm.current!);
  }, []);

  return (
    <>
      <h4>{playerStore.song?.title ?? 'No song loaded'}</h4>
      <strong>
        {playerStore.currentTime} / {playerStore.duration}
      </strong>
      <audio
        id="audio"
        ref={audioElm}
        src={playerStore.song?.path}
        onPlay={playerStore.onPlay}
        onPause={playerStore.onPause}
        onTimeUpdate={playerStore.onTimeUpdate}
        onDurationChange={playerStore.onDurationChange}
      />
    </>
  );
};

export default observer(AudioPlayer);
