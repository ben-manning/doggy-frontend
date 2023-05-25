'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Dog({ params }) {

  const [dog, setDog] = useState({});
  const router = useRouter();

  useEffect(() => {

    const getDog = async () => {
      const response = await fetch(`https://doggy-app-backend.herokuapp.com/dogs/${ params.id }`);
      const retrievedDog = await response.json();
      setDog(retrievedDog);
    }

    getDog()
      
  }, [ params.id ]);

  const removeDog = async () => {
    const res = await fetch(`https://doggy-app-backend.herokuapp.com/dogs/${ params.id }`, {
      headers: { 'Content-Type' : 'application/json' },
      method: 'DELETE'
    })

    const removedDog = await res.json()

    if (removedDog) {
      router.push('/dogs')
    }
  }

  return (
    <div>
      <h2>Here is your dog</h2>
      <h4>Name: { dog.name }</h4>
      <h4>Age: { dog.age }</h4>

      <Link href={`/dogs/${dog._id}/edit`}>Edit this dog</Link>
      <br></br>

      <button onClick={removeDog}>Remove Dog</button>
      <br></br>


      <Link href="/dogs">Back to all dogs</Link>
    </div>
  )
} 