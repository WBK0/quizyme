"use client";
import { useState, useEffect } from 'react';

const useLocalStorage = (key : string, initialValue : string | {}) => {
  const [value, setValue] = useState(() => { 
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      if(!item){
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }else{
        return JSON.parse(item);
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setLocalStorage = (newValue : string) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  }

  const removeLocalStorage = () => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      console.log("Storage event", e)
      if (e.key === key) {
        try {
          const newValue = JSON.parse(e.newValue || '');
          setValue(newValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
  }, [key]);

  return [value, setLocalStorage, removeLocalStorage]
}

export default useLocalStorage;