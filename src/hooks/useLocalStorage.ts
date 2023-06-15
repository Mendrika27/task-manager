import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const updateStoredValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, updateStoredValue];
};

export {
  useLocalStorage
}