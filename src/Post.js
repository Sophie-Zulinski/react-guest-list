import { useEffect, useState } from 'react';

export default function Post() {
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: 'Sophie', lastName: 'Z' }),
      });
      const createdGuest = await response.json();
      console.log('allguests', createdGuest);
    }
    fetchUsers().catch((error) => console.log(error));
  }, [refetch]);

  return (
    <>
      <h1>Add Guest</h1>
      <button
        onClick={() => {
          setRefetch(!refetch);
        }}
      >
        Add Guest
      </button>
    </>
  );
}
