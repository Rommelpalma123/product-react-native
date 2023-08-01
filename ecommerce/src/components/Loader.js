import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export const Loader = () => {
  return (
      <LottieView
      style={styles.container}
        source={require('../assets/animation_lkrfrgzv.json')}
        autoPlay
        loop
      />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
})
