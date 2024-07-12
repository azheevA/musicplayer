
import './App.css';

import Player from "./components/Player";
import {useState} from "react";


function App() {
    // const [trackId, setTrackId] = useState(null);
    //
    // const handleTrackIdChange = (newTrackId) => {
    //     setTrackId(newTrackId);
    // };
  return (
      <div className="app"
      >
          <Player />
      </div>
  );
}

export default App;
//onTrackIdChange={handleTrackIdChange}