import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [lastName, setLastname] = useState('');
  const [submittedguestlastName, setSubmittedguest] = useState('');

  function handleChange(x) {
    setLastname(x.target.value);
  }

  function handleSubmit(y) {
    y.preventDefault();
    setSubmittedguest(lastName);
    setLastname('');
  }
  const newState = [submittedguestlastName];
  console.log('newstate', newState);

  const array = newState.push[submittedguestlastName];
  console.log('array', array);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input Name*/}
        <input type="text" value={lastName} onChange={handleChange} />
        <div className='data-test-id="guest"'>
          submitted: {submittedguestlastName}
        </div>

        <br />

        <br />
        {/* Checkbox*/}
        <input
          className="attending"
          checked={submittedguestlastName}
          type="checkbox"
          onChange={(event) => {
            setSubmittedguest(event.currentTarget.checked);
          }}
        />

        <div>
          {submittedguestlastName} is {submittedguestlastName ? '' : 'not'}{' '}
          attending!
        </div>

        <br />
        {/* Remove to Usestate */}
        <button onClick={() => useState}>Remove</button>
      </form>
    </div>
  );
}
export default App;
