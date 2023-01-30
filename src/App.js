import './App.css';
import { useEffect, useState } from 'react';

let id = 0;
function App() {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState(false);

  // Input function first name
  function handlefirstChange(x) {
    setFirstname(x.target.value);
  }
  // Input function last name
  function handleChange(x) {
    setLastname(x.target.value);
  }

  //Resetbutton
  function reset(ev) {
    ev.preventDefault();
    setLastname('');
    setFirstname('');
    setChecked(false);
  }

  //Resetbutton02
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
    setFirstname('');
    setLastname('');
    event.preventDefault();
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
    async function handlePost() {
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
    handlePost().catch((error) => console.log(error));
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
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest to Guestlist API
      </button>

      {/* API delete guest */}
      <h1>Delete Guest from API</h1>
      <button
        onClick={() => {
          setRefetch02(!refetch02);
        }}
      >
        Delete Guest from API
      </button>

      {/* API print Guestlist */}
      <h1>Get all Guests from API</h1>

      {guests.map((userapi) => {
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
          setRefetch(!refetch);
        }}
      >
        Get All Guests from API
      </button>
    </div>
  );
}
export default App;
