import Link from "next/link";

export default function Home() {
  // const [dogs, setDogs] = useState([]);

  // useEffect(() => {

  //   const getDogs = async () => {
  //     const response = await fetch('https://doggy-app-backend.herokuapp.com/dogs');
  //     const retrievedDogs = await response.json();
  //     setDogs(retrievedDogs);
  //   }

  //   getDogs()
      
  // }, []);


  return (
    <main>
      <h1>Hello Index Page!</h1>
      <Link href="/dogs">On to the dogs!!</Link>
    </main>
  )
}