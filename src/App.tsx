import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CardSearch } from './components/CardSearch';
import CountStrings from './components/CountStrings';
import GeoPlot from './components/GeoPlot';
import GroupGraphs from './components/GroupGraphs';
import './App.css';

const tabs = [
  { path: '/', label: 'Browse Cards' },
  { path: '/count', label: 'Count Strings' },
  { path: '/geo', label: 'Geo Plot' },
  { path: '/graphs', label: 'Graphs' },
];

function TabNav() {
  const location = useLocation();
  return (
    <div className="tab-nav" style={{ display: 'flex', borderBottom: '2px solid #ccc', marginBottom: '2rem' }}>
      {tabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={
            'tab-link' + (location.pathname === tab.path || (tab.path === '/' && location.pathname === '') ? ' active' : '')
          }
          style={{
            padding: '1rem 2rem',
            textDecoration: 'none',
            color: location.pathname === tab.path || (tab.path === '/' && location.pathname === '') ? '#222' : '#888',
            borderBottom: location.pathname === tab.path || (tab.path === '/' && location.pathname === '') ? '3px solid #007bff' : '3px solid transparent',
            fontWeight: location.pathname === tab.path || (tab.path === '/' && location.pathname === '') ? 'bold' : 'normal',
            transition: 'border-bottom 0.2s',
          }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ flex: '0 0 auto', marginRight: '2rem' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Lars_Dahle_hode.JPG"
            alt="Lars Dahle"
            style={{ maxHeight: '120px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>Undersøk boksamlingen til Lars Dahle, misjonær på Madagaskar</h1>
        </div>
        <div style={{ flex: '0 0 auto', marginLeft: '2rem' }}>
          <img
            src={process.env.PUBLIC_URL + '/heatmap.png'}
            alt="Map of Madagascar"
            style={{ maxHeight: '120px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>
      <TabNav />
      <Routes>
        <Route path="/" element={<CardSearch />} />
        <Route path="/count" element={<CountStrings />} />
        <Route path="/geo" element={<GeoPlot />} />
        <Route path="/graphs" element={<GroupGraphs />} />
      </Routes>
    </Router>
  );
}

export default App;
