import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { FormCheck } from 'react-bootstrap';
import { useStore } from '../../stores/ProvideStore';
import MissHits from './MissHits';

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

      <FormCheck
        className="text-start mt-2 ms-2"
        checked={playerStore.trackMissHits}
        id="track-miss-hits-check"
        label="Track miss hits"
        onChange={playerStore.toggleTrackMissHits}
      />

      <MissHits />
    </>
  );
};

export default observer(AudioPlayer);
