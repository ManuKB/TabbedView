// Import necessary React libraries
import React, { useState } from "react";
import TabContent from "./TabContent";
import "./Tabs.css";

// Example data structure
const tabsData = {
  tab1: ["tab1.1", "tab1.2"],
  tab2: ["tab2.1", "tab2.2"],
  tab3: ["tab3.1", "tab3.2", "tab3.3"],
};

function DynamicTabs({ data }) {
  const [activeMainTab, setActiveMainTab] = useState(Object.keys(data)[0]); // Default to the first tab
  const [activeSubTab, setActiveSubTab] = useState(
    data[Object.keys(data)[0]][0]
  ); // Default to the first sub-tab

  return (
    <div class="tabs">
      {/* Main Tabs */}
      <div class="main_tab">
        {Object.keys(data).map((mainTab) => (
          <button
            key={mainTab}
            className="tab_header"
            style={{
              backgroundColor: activeMainTab === mainTab ? "#007BFF" : "#ccc",
              color: activeMainTab === mainTab ? "white" : "#4f4e4ec9",
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
      <div class="main_tab_conatiner">
        {/* Sub-Tabs */}
        <div class="sub_tab">
          {data[activeMainTab].map((subTab) => (
            <button
              key={subTab}
              className="tab_header"
              style={{
                backgroundColor: activeSubTab === subTab ? "#28A745" : "#ccc",
                color: activeSubTab === subTab ? "white" : "#4f4e4ec9",
              }}
              onClick={() => setActiveSubTab(subTab)}
            >
              {subTab}
            </button>
          ))}
        </div>
        {/* Content Display */}
        <TabContent activeMainTab={activeMainTab} activeSubTab={activeSubTab} />
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div class="tabs_container">
      <DynamicTabs data={tabsData} />
    </div>
  );
}

export default Tabs;
