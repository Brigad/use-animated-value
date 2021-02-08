import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';

import { Animated, Easing } from 'react-native';

const usePrevious = <ValueType extends any>(value: ValueType) => {
  const ref = useRef<ValueType | undefined>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

type Options<T> = {
  useNativeDriver?: boolean;
  duration?: number;
  easing?: ((value: number) => number) | undefined;
  onAnimateEnd?: (newValue: T, finished: boolean) => void;
};

export const useAnimatedValue = <T extends string | number>(
  value: T,
  {
    useNativeDriver = false,
    duration = 200,
    easing = Easing.out(Easing.quad),
    onAnimateEnd,
  }: Options<T> = {}
) => {
  const [currentValue, setCurrentValue] = useState(value);
  const prevProp = usePrevious(value);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationTimingRef = useRef<Animated.CompositeAnimation | null>(null);

  const animate = useCallback(
    (newProp: T) => {
      animationTimingRef.current?.stop();

      animatedValue.setValue(0);
      animationTimingRef.current = Animated.timing(animatedValue, {
        duration,
        easing,
        toValue: 1,
        useNativeDriver,
      });
      animationTimingRef.current.start((cb) => {
        onAnimateEnd?.(newProp, cb.finished);
        setCurrentValue(newProp);
      });
    },
    [animatedValue, duration, easing, onAnimateEnd, useNativeDriver]
  );

  useLayoutEffect(() => {
    if (prevProp !== undefined && value !== prevProp) {
      animate(value);
    }
  }, [prevProp, animate, value]);

  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [currentValue, value] as string[] | number[],
  });
};

export default useAnimatedValue;
