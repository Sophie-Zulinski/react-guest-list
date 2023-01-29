import { useState } from 'react';

let nextId = 0;
const initialArtists = [];

export default function App() {
  const [artists, setArtists] = useState(initialArtists);

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
      <input
        checked={guest.attending}
        type="checkbox"
        onChange={handleAttending}
      />

      <button onClick={handleClick}>Insert</button>

      {/*<ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>*/}

      {console.log('finalguests', artists)}
    </>
  );
}
