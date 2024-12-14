// Import necessary React libraries
import React, { useState } from 'react';

// Example data structure
const tabsData = {
  tab1: ['tab1.1', 'tab1.2'],
  tab2: ['tab2.1', 'tab2.2'],
  tab3: ['tab3.1', 'tab3.2', 'tab3.3'],
};

function DynamicTabs({ data }) {
  const [activeMainTab, setActiveMainTab] = useState(Object.keys(data)[0]); // Default to the first tab
  const [activeSubTab, setActiveSubTab] = useState(data[Object.keys(data)[0]][0]); // Default to the first sub-tab

  return (
    <div>
      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(data).map((mainTab) => (
          <button
            key={mainTab}
            style={{
              padding: '10px',
              backgroundColor: activeMainTab === mainTab ? '#007BFF' : '#ccc',
              color: activeMainTab === mainTab ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              setActiveMainTab(mainTab);
              setActiveSubTab(data[mainTab][0]); // Reset to the first sub-tab when main tab changes
            }}
          >
            {mainTab}
          </button>
        ))}
      </div>

      {/* Sub-Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {data[activeMainTab].map((subTab) => (
          <button
            key={subTab}
            style={{
              padding: '10px',
              backgroundColor: activeSubTab === subTab ? '#28A745' : '#ccc',
              color: activeSubTab === subTab ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveSubTab(subTab)}
          >
            {subTab}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Selected Tab:</h3>
        <p>
          Main Tab: <strong>{activeMainTab}</strong>
        </p>
        <p>
          Sub Tab: <strong>{activeSubTab}</strong>
        </p>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dynamic Tabs Example</h1>
      <DynamicTabs data={tabsData} />
    </div>
  );
}

export default Tabs;
