import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [submittedguest, setSubmittedguest] = useState('');

  function handleChange(x) {
    setLastname(x.target.value);
  }

  function handlefirstChange(x) {
    setFirstname(x.target.value);
  }

  function handleSubmit(y) {
    y.preventDefault();
    setSubmittedguest(firstName + lastName);
  }

  // API starts here!!
  // get guests
  const [guests, setGuests] = useState([]);
  const [refetch, setRefetch] = useState(true);

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
    async function fetchUsers() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      const createdGuest = await response.json();
      console.log('createdguest', createdGuest);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input fristname*/}
        <input type="text" value={firstName} onChange={handlefirstChange} />
        <div className='data-test-id="guest"'></div>
        {/* Input lastname*/}
        <input type="text" value={lastName} onChange={handleChange} />

        <div className='data-test-id="guest"'>submitted: {submittedguest}</div>
        {console.log('submittedGuest', submittedguest)}
        <br />
        <input
          className="attending"
          checked={submittedguest}
          type="checkbox"
          onChange={(event) => setSubmittedguest(event.currentTarget.checked)}
        />
        <br />
        {/* Checkbox*/}

        <br />
        {/* Remove to Usestate */}
        <button onClick={() => useState}>Remove</button>
      </form>
      {/* API STARTS HERE!! */}
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
      {/* API add guest */}
      <h1>Add Guest</h1>
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest
      </button>
    </div>
  );
}
export default App;
