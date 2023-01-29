import { useEffect, useState } from 'react';

let nextId = 0;

export default function App() {
  const [artists, setArtists] = useState([]);
  const [guest, setGuest] = useState([
    {
      firstName: '',
      lastName: '',
      attending: false,
    },
  ]);

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
          firstName: 'Sophie',
          lastName: 'Zulinski',
        }),
      });
      const createdGuest = await response.json();
      console.log('allguests', createdGuest);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  // firstName

  function handlefirstName(e) {
    setGuest({
      ...guest,

      firstName: e.target.value,
    });
  }

  // lastName
  function handlelastName(e) {
    setGuest({
      ...guest,

      lastName: e.target.value,
    });
  }

  // attending-Button
  function handleAttending(e) {
    setGuest({
      ...guest,

      attending: e.target.checked,
    });
  }

  // submit-Button
  function handleClick() {
    const insertAt = 0; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: guest },
      // Items after the insertion point:
      ...artists.slice(insertAt),
    ];
    setArtists(nextArtists);
    setGuest('');
  }

  return (
    <>
      <h1>Guest list</h1>
      <input value={guest.firstName} onChange={handlefirstName} />

      <input value={guest.lastName} onChange={handlelastName} />
      <br />

      <span>attending</span>
      <input
        checked={guest.attending}
        type="checkbox"
        onChange={handleAttending}
      />
      <br />

      <button onClick={handleClick}>Submit</button>
      {/*WRONG!: <ul>
        {artists.map((name) => (
          <li key={name.firstName}>{name.lastName}</li>
        ))}
      </ul>*/}
      <button onClick={() => useState}>Remove</button>
      <br />
      <br />
      <br />
      {/*API starts here*/}
      <h1>Get all Guests</h1>

      {guests.map((user) => {
        return (
          <div key={`user-profile-${user.id}`}>
            <h3>
              {user.id} {user.firstName} {user.lastName}
            </h3>
          </div>
        );
      })}

      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Get All Guests
      </button>
      <h1>Add Guest</h1>
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest
      </button>
      {console.log('finalguests', artists)}
    </>
  );
}
