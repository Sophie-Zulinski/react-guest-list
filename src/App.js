import { useState } from 'react';

let nextId = 1;

export default function Form() {
  const [guest, setGuest] = useState([
    {
      firstName: '',
      lastName: '',
      attending: false,
    },
  ]);

  function handlefirstName(e) {
    setGuest({
      ...guest,

      firstName: e.target.value,
    });
  }

  function handlelastName(e) {
    setGuest({
      ...guest,

      lastName: e.target.value,
    });
  }

  function handleAttending(e) {
    setGuest({
      ...guest,

      attending: e.target.checked,
    });
  }

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...guest.slice(0, insertAt),
      // New item:
      { id: nextId++, ...guest },
      // Items after the insertion point:
      ...guest.slice(insertAt),
    ];
    setGuest(nextArtists);
    setGuest('');
  }

  console.log('guest 01', guest);

  return (
    <>
      <form>
        <label>
          FirstName
          <input value={guest.firstName} onChange={handlefirstName} />
        </label>
        <label>
          LastName
          <input value={guest.lastName} onChange={handlelastName} />
        </label>
        {/*
        <input
          checked={guest.attending}
          type="checkbox"
          onChange={handleAttending}
        />
        <br />
        <br />
        <br />
        {/* key
        <button onClick={handleClick}>Insert</button>
        <ul>
          {guest.map((artist) => (
            <li key={nextId++}>{guest.lastName}</li>
          ))}
        </ul>*/}
        {console.log('guest 02', guest)}

        <button onClick={() => useState}>Remove</button>
      </form>
    </>
  );
}
