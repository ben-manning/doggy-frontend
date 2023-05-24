'use client';
import Link from 'next/link';

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
    <main className={styles.main}>
      <h1>Hello React!</h1>
      <Link href="/"><h3>Back to Home</h3></Link>
      <br></br>
      <br></br>
      <Link href="/dogs/new">Create A Dog</Link>
      { dogs.map(dog => (
        <Link href={`/dogs/${ dog._id }`} key={ dog._id }><h1 >{ dog.name }</h1></Link>
      ))}
    </main>
  )
}
