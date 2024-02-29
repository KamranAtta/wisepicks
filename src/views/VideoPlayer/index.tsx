import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

const VideoPlayer = ({ videoId }: any) => {
  const matches = useMediaQuery('(min-width: 830px)');
  const onPlayerReady: YouTubeProps['onReady'] = (event: any) => {
      event.target.playVideo();
  };
  
  const opts: YouTubeProps['opts'] = {
      height: matches ? '500': '200',
      width: '100%',
      playerVars: {
          autoplay: 1,
      },
  };
  
  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} /> 
};

export default VideoPlayer;
