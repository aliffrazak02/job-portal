import '@testing-library/jest-dom';

// Suppress React Router v6 future-flag warnings in test output
const originalWarn = console.warn.bind(console);
console.warn = (msg, ...args) => {
  if (typeof msg === 'string' && msg.includes('React Router Future Flag Warning')) return;
  originalWarn(msg, ...args);
};
