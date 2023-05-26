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
      <Link href="/dogs">Back to all dogs</Link>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">New Dog Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            className="form-input w-full rounded-md border-gray-300"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Age</label>
          <input
            type="number"
            className="form-input w-full rounded-md border-gray-300"
            id="age"
            placeholder="Enter your age"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
} 