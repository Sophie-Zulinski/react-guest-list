import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: {
      firstName: '',
      lastName: '',
      attending: false,
    },
  });

  function handlefirstName(e) {
    setPerson({
      ...person,
      name: {
        ...person.name,
        firstName: e.target.value,
      },
    });
  }

  function handlelastName(e) {
    setPerson({
      ...person,
      name: {
        ...person.name,
        lastName: e.target.value,
      },
    });
  }

  function handleAttending(e) {
    setPerson({
      ...person,
      name: {
        ...person.name,
        attending: e.target.value,
      },
    });
  }

  console.log(person);
  return (
    <>
      <form onSubmit={handleAttending}>
        <label>
          FirstName
          <input value={person.name.firstName} onChange={handlefirstName} />
        </label>
        <label>
          LastName
          <input value={person.name.lastName} onChange={handlelastName} />
        </label>
        <input
          checked={person.name.attending}
          type="checkbox"
          onChange={handleAttending}
        />
        <button onClick={() => useState}>Remove</button>
      </form>
    </>
  );
}
