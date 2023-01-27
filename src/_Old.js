import './App.css';
import { useEffect, useState } from 'react';

let nextId = 0;

export default function _Old) {
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

const App = () => {
  let [Fullname, setFullname] = useState({
    fname: '',
    lname: '',
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setFullname((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  console.log('hello', Fullname);

  return (
    <>
      <form>
        <div>
          <h1>
            Hello <span style={{ color: 'red' }}>{Fullname.fname}</span>
            <span style={{ color: 'green' }}>{Fullname.lname}</span>
          </h1>
          <input
            type="text"
            placeholder="Enter Your FirstName"
            onChange={handleChange}
            name="fname"
          />
          <input
            type="text"
            placeholder="Enter Your LastName"
            onChange={handleChange}
            name="lname"
          />
        </div>
      </form>
    </>
  );
};

export default App;
