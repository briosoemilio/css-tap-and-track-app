import { useRef } from "react";
import { Animated } from "react-native";

const useSpringAnimation = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  const startSlideUp = () => {
    Animated.spring(bounceValue, {
      toValue: -300,
      friction: 5,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  const startSlideDown = () => {
    Animated.spring(bounceValue, {
      toValue: 0,
      friction: 5,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  return { bounceValue, startSlideUp, startSlideDown };
};

export default useSpringAnimation;
