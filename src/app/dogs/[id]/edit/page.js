'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function EditDog({ params }) {
  const [dog, setDog] = useState({ name: '', age: 0 })

  const router = useRouter();
  
  useEffect(() => {

    const getDog = async () => {
      const response = await fetch(`https://doggy-app-backend.herokuapp.com/dogs/${ params.id }`);
      const retrievedDog = await response.json();
      setDog(retrievedDog);
    }

    getDog()
      
  }, [ params.id ]);

  const handleChange = (evt) => {
    setDog({ ...dog, [evt.target.id]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`https://doggy-app-backend.herokuapp.com/dogs/${ params.id }`, {
      headers: { 'Content-Type' : 'application/json' },
      method: 'PUT',
      body: JSON.stringify({ name: dog.name, age: Number(dog.age) })
    })

    const updatedDog = await res.json()

    if (updatedDog) {
      router.push('/dogs')
    }
  }

  return (
    <div>
      <h1>Edit Dog Form</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:
        <input type="text" name="name" id="name" onChange={handleChange}  value={ dog.name } ></input>
      </label>
      <label htmlFor="age">Age:
        <input type="number" name="age" id="age" onChange={handleChange} value={ dog.age }></input>
      </label>
      
      <input type="submit" value="Create Dog" />
      </form>
    </div>
  )
}