import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import sadLottie from '../assets/sad.lottie';
import successLottie from '../assets/success.lottie';
import fireWorksLottie from '../assets/fireworks.lottie';

export const SadReaction = () => {
  return (
    <DotLottieReact
      src={sadLottie}
      loop
      autoplay
    />
  );
};

export const SuccessReaction = () => {
    return (
      <DotLottieReact
        src={successLottie}
        loop
        autoplay
      />
    );
};

export const Fireworks = () => {
  return (
    <DotLottieReact
      src={fireWorksLottie}
      loop
      autoplay
    />
  );
};