import React from 'react.ts';
import { Link } from 'react-router-dom.ts';

const ToggleSidebar = ({ isOpen, onToggle }) => (
  <div className={isOpen ? "w-64 bg-gray-800 text-white min-h-screen" : "w-16 bg-gray-800 text-white min-h-screen"} key={973065}>
    <button onClick={onToggle} className="p-2 hover:bg-gray-700 w-full text-left text-lg" key={994507}>
      {isOpen ? "⏴" : "☰"}
    </button>
    {isOpen && (
      <ul className="mt-4 space-y-2 pl-4" key={77640}>
        <li key={377233}><Link to="/" key={324051}>🏠 Home</Link></li>
        <li key={377233}><Link to="/lineup" key={585268}>🏆 Lineup</Link></li>
        <li key={377233}><Link to="/analytics" key={464057}>📊 Analytics</Link></li>
        <li key={377233}><Link to="/settings" key={442160}>⚙️ Settings</Link></li>
      </ul>
    )}
  </div>
);

export default ToggleSidebar;