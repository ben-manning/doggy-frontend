'use client';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../page.module.css'

import { useState, useEffect } from 'react'

export default function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {

    const getDogs = async () => {
      const response = await fetch('https://doggy-app-backend.herokuapp.com/dogs');
      const retrievedDogs = await response.json();
      setDogs(retrievedDogs);
    }

    getDogs()
      
  }, []);


  return (
    <div className="bg-gray-100">
    <Head>
      <title>Dog Adoption</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Dog Adoption</h1>
      </div>
    </header>

    <main className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Available Dogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <Link key={dog.id} href={`/dogs/${dog.id}`}>
            
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={dog.image}
                    alt={dog.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{dog.name}</h3>
                  <p className="text-gray-600">{dog.breed}</p>
                  <p className="text-gray-600">{dog.age} years old</p>
                </div>
              </div>
          </Link>
        ))}
      </div>
    </main>

    <footer className="bg-gray-200 text-center py-4">
      <p className="text-gray-600">Dog Adoption &copy; 2023</p>
    </footer>
  </div>
  )
}
