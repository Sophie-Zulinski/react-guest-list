import { useEffect, useState } from 'react';

let nextId = 0;

export default function Apptest() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  const newArray = { artists };
  console.log('arrayartists03', newArray);
  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          setName('');
          setArtists([...artists, { id: nextId++, name: name }]);
        }}
      >
        Add
      </button>

      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
