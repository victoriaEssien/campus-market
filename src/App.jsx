import React, { useEffect } from 'react';

import LandingPage from "./pages/LandingPage"

function App() {

  useEffect( () => {
    const checkReload = () => {
      const perfEntries = performance.getEntriesByType('navigation');
      if (perfEntries.length > 0 && perfEntries[0].type === 'reload') {
        console.log('Page was reloaded');
      }
    };
    checkReload();
  }, [] )

  return (
    <div>
      <LandingPage />
    </div>
  )
}

export default App