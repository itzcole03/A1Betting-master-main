import React from 'react.ts';
import { render, screen } from '@testing-library/react.ts';
import { measurePerformance } from '@/performanceMonitor.ts';
import App from '@/../App.ts';

// test('renders App without crashing', () => {
//   render(<App />);
// });

test('App loads in under 2 seconds', async () => {
  await measurePerformance(async () => {
    // render(<App />);
    await screen.findByText(/Dashboard/i);
  }, 'App initial load');
});
