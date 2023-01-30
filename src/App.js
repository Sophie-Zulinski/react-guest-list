import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [submittedguest, setSubmittedguest] = useState('');
  const [checked, setChecked] = useState(false);

  // Input function first name
  function handlefirstChange(x) {
    setFirstname(x.target.value);
  }
  // Input function last name
  function handleChange(x) {
    setLastname(x.target.value);
  }

  // Submit on return-Taste
  function handleSubmit(y) {
    y.preventDefault();
    setSubmittedguest(firstName);
  }
  //Resetbutton
  function reset(ev) {
    ev.preventDefault();
    setLastname('');
    setFirstname('');
    setChecked(false);
  }

  // API starts here!!
  // get guests
  const [guests, setGuests] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [refetch02, setRefetch02] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log('allguests', allGuests);
      setGuests(allGuests);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  // post guests
  useEffect(() => {
    async function handleSubmit() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          attending: checked,
        }),
      });
      const createdGuest = await response.json();
      console.log('createdguest', createdGuest);
    }
    handleSubmit().catch((error) => console.log(error));
  }, [refetch]);

  // delete guest

  useEffect(() => {
    async function handleDelete() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests/7`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      console.log('createdguest', deletedGuest);
    }
    handleDelete().catch((error) => console.log(error));
  }, [refetch02]);

  // return
  return (
    <div data-test-id="guest">
      <form onSubmit={handleSubmit}>
        {console.log('submittedguest', [submittedguest])}
        <h1>Registration Form</h1>
        {/* Input fristname*/}
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          value={firstName}
          onChange={handlefirstChange}
          id={firstName}
        />
        <div className='data-test-id="guest"'></div>
        {/* Input lastname*/}
        <label htmlFor="firstName">Last name</label>
        <input
          type="text"
          value={lastName}
          onChange={handleChange}
          id={lastName}
        />
        <br />
        {/* Checkbox*/}
        <label htmlFor="attending">Attending</label>
        <input
          aria-label="attending status"
          className="attending"
          checked={checked}
          type="checkbox"
          id="attending"
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <br />

        <br />
      </form>
      {/* API STARTS HERE!! */}
      {/* API add guest */}
      <h1>Add Guest</h1>
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest
      </button>

      {/* API delete guest */}
      <h1>Delete Guest</h1>
      <button
        onClick={() => {
          setRefetch02(!refetch02);
        }}
      >
        Delete Guest
      </button>
      {/* Reset button */}
      <button onClick={reset}>Reset</button>
      {/* API print Guestlist */}
      <h1>Get all Guests</h1>

      {guests.map((user) => {
        return (
          <div key={`user-profile-${user.id}`}>
            <div>
              {user.id} {user.firstName} {user.lastName}
            </div>
          </div>
        );
      })}
      {/* API get all guests */}
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Get All Guests
      </button>
    </div>
  );
}
export default App;
