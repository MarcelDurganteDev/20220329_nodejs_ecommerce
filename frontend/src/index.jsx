import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes'

// ReactDOM.createRoot(document.getElementById('root')).render(<Routes />);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <Routes />
);