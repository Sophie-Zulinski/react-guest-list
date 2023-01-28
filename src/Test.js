import './App.css';
import { useState } from 'react';

async function App() {
  const [lastName, setLastname] = useState('');
  const [submittedguestlastName, setSubmittedguest] = useState('');

  // function to handle submit by klicking the key
  function handleChange(x) {
    setLastname(x.target.value);
  }
  // function to handle submit by klicking the key
  function handleSubmit(y) {
    y.preventDefault();
    setSubmittedguest(lastName);
    setLastname('');
  }
  const newState = [submittedguestlastName];
  console.log('newstate', newState);

  function newArray(arr1, arr2) {
    return [...arr1, ...arr2];
  }

  const hello = newArray([submittedguestlastName], [submittedguestlastName]);
  console.log('hello', hello);

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
