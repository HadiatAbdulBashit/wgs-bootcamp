import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Navbar from "./component/Navbar";
import Footer from './component/Footer';

import './index.css';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(<Navbar />, document.getElementById('nav'));
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

// import ReactDOM from 'react-dom/client';
// const nav = ReactDOM.createRoot(document.getElementById('nav'));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// const footer = ReactDOM.createRoot(document.getElementById('footer'));
// nav.render(
//   <React.StrictMode>
//     <Navbar />
//   </React.StrictMode>
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// footer.render(
//   <React.StrictMode>
//     <Footer />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
