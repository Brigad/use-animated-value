/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Animated, Button, Easing, Text } from 'react-native';
import useAnimatedValue from '@brigad/use-animated-value';

export default function App() {
  const [random, setRandom] = useState(0);

  const offset = useAnimatedValue(random, { useNativeDriver: true });
  const offset2 = useAnimatedValue(random, { duration: 1000 });
  const offset3 = useAnimatedValue(random, {
    easing: Easing.elastic(2),
    duration: 1000,
  });
  const color = useAnimatedValue(random > 0 ? 'red' : 'blue');

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{ transform: [{ translateX: offset }], padding: 10 }}
      >
        {`I use the native driver!`}
      </Animated.Text>
      <Animated.Text
        style={{ transform: [{ translateX: offset2 }], padding: 10 }}
      >
        {`I have a custom duration!`}
      </Animated.Text>
      <Animated.Text
        style={{ transform: [{ translateX: offset3 }], padding: 10 }}
      >
        {`I have a custom easing!`}
      </Animated.Text>
      <Animated.Text style={{ color, padding: 10 }}>
        {`I can animate colors!`}
      </Animated.Text>
      <Button
        title="Move text"
        onPress={() => {
          setRandom(Math.floor((Math.random() - 0.5) * 200));
        }}
      />
      <Text>Current Value {random}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
});
