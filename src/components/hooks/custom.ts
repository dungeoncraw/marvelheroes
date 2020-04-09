import { useState, useEffect, useRef } from "react";

export const useVisible = (initialState: boolean = false) => {
    const [visible, setVisible] = useState(initialState);
    const onChange = (b: boolean = !visible) => { setVisible(b); };
    const onClick = () => { setVisible(!visible); };
    return {
        value: visible,
        onChange: onChange,
        onClick: onClick
    };
};
export const usePrevious = <T extends {}>(value: T) => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

// Hook
export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );
  
    return debouncedValue;
  }