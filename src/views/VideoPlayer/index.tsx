import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

const VideoPlayer = ({ videoId }: any) => {
    const matches = useMediaQuery('(min-width: 830px)');
    const onPlayerReady: YouTubeProps['onReady'] = (event: any) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    
      const opts: YouTubeProps['opts'] = {
        height: matches ? '500': '200',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
      return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default VideoPlayer;
