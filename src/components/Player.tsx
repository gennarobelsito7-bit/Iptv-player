import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface PlayerProps {
  options: videojs.VideoOptions;
}

const Player: React.FC<PlayerProps> = ({ options }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<videojs.Player | null>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, options, () => {
        console.log('Player is ready');
      });
    }

    return () => { 
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [options]);

  return (
    <div>
      <video ref={videoRef} className='video-js' />
    </div>
  );
};

export default Player;