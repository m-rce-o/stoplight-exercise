import { useEffect, useState } from 'react';
import statesData from './data/states.json';
import './App.css';

interface LightState {
  name: string;
  color: string;
  durationInMs: number;
}

const STATES: LightState[] = statesData;
const ORDER: readonly string[] = ['green', 'yellow', 'red', 'purple', 'orange'];

// Resolves ORDER (color names) into LightState objects, in ORDER's order.
// Names in ORDER with no matching state are skipped.
function buildSequence(states: LightState[], order: readonly string[]): LightState[] {
  const byName = new Map(states.map(s => [s.name, s]));
  return order
    .map(name => byName.get(name))
    .filter((s): s is LightState => s !== undefined);
}

const SEQUENCE = buildSequence(STATES, ORDER);

function Stoplight() {
  const [index, setIndex] = useState(0); // position in SEQUENCE, not in STATES

  useEffect(() => {
    if (SEQUENCE.length === 0) return;

    const timeoutId = setTimeout(() => {
      setIndex(prev => (prev + 1) % SEQUENCE.length);
    }, SEQUENCE[index].durationInMs);

    return () => clearTimeout(timeoutId);
  }, [index]);

  const active = SEQUENCE[index];

  console.log('stoplight');
  return (
    <div className="stoplight">
      {STATES.map(state => (
        <div
          key={state.name}
          className={`light${state.name === active?.name ? ' on' : ''}`}
          style={{ backgroundColor: state.color }}
        />
      ))}
    </div>
  );
}


function App() {
  console.log('App');
  return ([<Stoplight key={1} />, <Stoplight key={2} />]);
}

export default App;