'use client';


import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from 'next/link';

export default function NewDogForm() {
  const [newDog, setNewDog] = useState({name: "", age: 0})

  const router = useRouter()

  const handleChange = (evt) => {
    setNewDog({ ...newDog, [evt.target.id]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch('https://doggy-app-backend.herokuapp.com/dogs', {
      headers: { 'Content-Type' : 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name: newDog.name, age: Number(newDog.age) })
    })

    const dog = await res.json()

    if (dog) {
      router.push('/dogs')
    }
  }

  return (

    <div>
      <h1>New Dog Form</h1>
      <Link href="/dogs">Back to all dogs</Link>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:
        <input type="text" name="name" id="name" onChange={handleChange} ></input>
      </label>
      <label htmlFor="age">Age:
        <input type="number" name="age" id="age" onChange={handleChange} ></input>
      </label>
      
      <input type="submit" value="Create Dog" />
      </form>
    </div>
  )
} 