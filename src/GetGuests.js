import { useEffect, useState } from 'react';

export default function GetGuests() {
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
  return (
    <>
      <h1>PropTypes</h1>

      {guests.map((user) => {
        return (
          // using prefixes for your ids is good practice
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
    </>
  );
}
