// src/utils/localStorage.js
export function getFromLocalStorage(key, defaultValue = null) {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }
  
  export function setToLocalStorage(key, value) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  }
  
  export function removeFromLocalStorage(key) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
  
  export function clearLocalStorage() {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  }
  