import { useEffect, useState } from 'react';

let nextId = 0;
export default function App() {
  const [guest, setGuest] = useState([
    {
      firstName: '',
      lastName: '',
      attending: false,
    },
  ]);

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
  const [registeredguests, setregisteredGuests] = useState([]);
  // Form ends here

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
          firstName: guest.firstName,
          lastName: guest.lastName,
        }),
      });
      const createdGuest = await response.json();
      console.log('allguests', createdGuest);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  return (
    <>
      <h1>Guest list</h1>
      {/*Input firstname*/}
      <input value={guest.firstName} onChange={handlefirstName} />
      {/*Input lastname*/}
      <input value={guest.lastName} onChange={handlelastName} />
      <br />

      <span>attending</span>
      {/*Attending checkbox*/}
      <input
        checked={guest.attending}
        type="checkbox"
        onChange={handleAttending}
      />

      <br />
      {/*Register Button*/}
      <button
        onClick={() => {
          setGuest('');
          registeredguests.push({
            id: nextId++,
            name: guest,
          });
        }}
      >
        Register
      </button>
      <br />
      <br />
      <br />
      {/*WRONG!: <ul>
        {artists.map((name) => (
          <li key={name.firstName}>{name.lastName}</li>
        ))}
      </ul>*/}
      {/*Remove Button (doesn't work yet*/}
      <button onClick={() => useState}>Remove</button>
      <br />
      <br />
      <br />
      {/*API starts here!!*/}
      {/*get all guests*/}
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
      {/*add guests (atm just string)*/}
      <h1>Add Guest</h1>
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest
      </button>
      {console.log('registerguests:', registeredguests)}
      {console.log('testneu', guest.lastName)}
    </>
  );
}
