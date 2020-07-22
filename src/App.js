import React from 'react';
import './App.css';
import Appbar from './Components/Appbar';
import Panel from './Components/Panel';
import BottomNav from './Components/BottomNav';
import Table from './Components/Table';

function App() {
  const screen = React.useState(0);

  return (
    <div className="App">
      <Appbar />
      {screen[0] === 0 ? <Panel /> : <Table />}

      <BottomNav value={screen} />
    </div>
  );
}

export default App;
