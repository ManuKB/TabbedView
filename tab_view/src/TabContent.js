function TabContent({ activeMainTab, activeSubTab }){
    return (
      <div className="sub_tab_conatiner">
        <h3>Selected Tab:</h3>
        <p>
          Main Tab: <strong>{activeMainTab}</strong>
        </p>
        <p>
          Sub Tab: <strong>{activeSubTab}</strong>
        </p>
      </div>
    );
  };

export default TabContent;
  