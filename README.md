# @brigad/use-animated-value

One liner hook to get an Animated.Value from a value.

## Installation

```sh
npm install @brigad/use-animated-value
```
or
```sh
yarn add @brigad/use-animated-value
```

## Usage

```jsx
import useAnimatedValue from "@brigad/use-animated-value";

const BoxWithAnimatedBackgroundColor = ({color}) => {
    const animatedColor = useAnimatedValue(color);

    return <Animated.View style={{backgroundColor: animatedColor}} />
}
```

## API

```tsx
type Options<T> = {
    useNativeDriver?: boolean;
    duration?: number;
    easing?: ((value: number) => number) | undefined;
    onAnimateEnd?: (newValue: T, finished: boolean) => void;
};

const value = useAnimatedValue<T>(value: T, options: Options<T>);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
