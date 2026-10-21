import { useEffect, useState } from 'react';
import statesData from './data/states.json';
import './App.css';

interface LightState {
  name: string;
  color: string;
  durationInMs: number;
}

const STATES: LightState[] = statesData;

function App() {
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index === 2) {
        setIndex(0);
      } else {
        setIndex(prev => (prev + 1));
      }
    }, STATES[index].durationInMs);

    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <div className="stoplight">
      {STATES.map((state, i) => (
        <div
          key={state.name}
          className={`light${i === index ? ' on' : ''}`}
          style={{ backgroundColor: state.color }}
        />
      ))}
    </div>
  );
}

export default App;