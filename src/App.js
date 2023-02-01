import './App.css';
import { useEffect, useState } from 'react';

let id = 0;
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState(false);

  // Input function first name
  function handlefirstChange(x) {
    setFirstName(x.target.value);
  }
  // Input function last name
  function handleChange(x) {
    setLastName(x.target.value);
  }

  // Resetbutton
  function reset(ev) {
    ev.preventDefault();
    setLastName('');
    setFirstName('');
    setChecked(false);
  }

  // Resetbutton02
  function resetlist(ev) {
    ev.preventDefault();
    setUsers([]);
  }

  function handleSubmit(event) {
    const newUsers = [
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        attending: checked,
      },
      ...users,
    ];
    id++;
    setUsers(newUsers);
    setFirstName('');
    setLastName('');
    event.preventDefault();
  }

  // API starts here!!
  // show guests
  const [guests, setGuests] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log('allguests', allGuests);
      setGuests(allGuests);
      setIsLoading(false);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  // post guests
  async function handlePost(event) {
    event.preventDefault();
    const baseUrl = 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    setRefetch(!refetch);
    setFirstName('');
    setLastName('');

    console.log(createdGuest);
  }

  // delete one guest (right now only id 7 !!)

  useEffect(() => {
    async function handleDelete() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests/7`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      console.log('deletedGuest', deletedGuest);
    }
    handleDelete().catch((error) => console.log(error));
  }, [refetch]);

  // Delete ALL guests

  async function deleteAllGuests() {
    for (const guest of guests) {
      const baseUrl = 'http://localhost:4000';
      await fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      });
    }
    const baseUrl = 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuests(allGuests);
  }

  // return
  return (
    <div data-test-id="guest">
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        {/* Input fristname*/}
        <label htmlFor="firstName">First name</label>
        <input value={firstName} onChange={handlefirstChange} id={firstName} />
        <div className='data-test-id="guest' />
        {/* Input lastname*/}
        <label htmlFor="firstName">Last name</label>
        <input value={lastName} onChange={handleChange} id={lastName} />
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
        Names:
        {users.map((user) => {
          return (
            <div key={`user-${user.id}`}>
              {user.id} {user.firstName} {user.lastName} {user.checked}
            </div>
          );
        })}
        <button>Add name</button>
        {console.log('names', users)}
        <br />
        {/* Reset button */}
        <button onClick={reset}>Reset Input Fields</button>
        <button onClick={resetlist}>Reset Namelist</button>
      </form>
      {/* API STARTS HERE!! */}
      {/* API add guest */}
      <h1>Add Guest to Guestlist API</h1>
      <button onClick={handlePost}>Add Guest to API</button>

      {/* API print Guestlist */}
      <h1>Get all Guests from API</h1>
      {!isLoading &&
        guests.map((userapi) => {
          return (
            <div key={`user02-profile-${userapi.id}`}>
              <div>
                {userapi.id} {userapi.firstName} {userapi.lastName}
              </div>
            </div>
          );
        })}
      {/* API get all guests */}
      <button
        onClick={() => {
          setIsLoading(true);
          setRefetch(!refetch);
        }}
      >
        Get All Guests from API
      </button>
      {/* API delte ALL guests */}
      <button onClick={deleteAllGuests}>Delete all guests from API</button>

      {/* API delete one guest (not working right now!!)
      <h1>Delete Guest from API</h1>
      <button
        onClick={() => {
          setIsLoading(true);
          setRefetch02(!refetch02);
        }}
      >
        Delete Guest from API
      </button>*/}
    </div>
  );
}
export default App;
