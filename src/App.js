import { useState } from 'react';

export default function Form() {
  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    attending: false,
  });

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

  console.log(guest);

  return (
    <>
      <form onSubmit={handleAttending}>
        <label>
          FirstName
          <input value={guest.firstName} onChange={handlefirstName} />
        </label>
        <label>
          LastName
          <input value={guest.lastName} onChange={handlelastName} />
        </label>
        <input
          checked={guest.attending}
          type="checkbox"
          onChange={handleAttending}
        />
        <br />

        <button onClick={() => useState}>Remove</button>
      </form>
    </>
  );
}
