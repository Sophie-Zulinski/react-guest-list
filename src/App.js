import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [lastName, setLastname] = useState('');
  const [submittedguest, setSubmittedguest] = useState('');

  function handleChange(x) {
    setLastname(x.target.value);
  }

  function handleSubmit(y) {
    y.preventDefault();
    setSubmittedguest(lastName);
    setLastname('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input Name*/}
        <input type="text" value={lastName} onChange={handleChange} />
        <div className='data-test-id="guest"'>submitted: {submittedguest}</div>

        <br />

        <br />
        {/* Checkbox*/}
        <input
          className="attending"
          checked={submittedguest}
          type="checkbox"
          onChange={(event) => setSubmittedguest(event.currentTarget.checked)}
        />

        <div>
          {submittedguest} is {submittedguest ? '' : 'not'} attending!
        </div>
        <br />
        {/* Remove to Usestate */}
        <button onClick={() => useState}>Remove</button>
      </form>
    </div>
  );
}
export default App;
