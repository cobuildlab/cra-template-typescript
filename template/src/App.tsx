import React from 'react';

import logo from './logo.png';
import './App.css';

/**
 * Root App component.
 *
 * @returns {JSX.Element} Root App component.
 */
export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Cobuild Lab Template</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};
