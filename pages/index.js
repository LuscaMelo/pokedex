import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home({pokemon}) {

  return (
    <section className={styles.app}>

      <Layout>
        <div className={styles.titleGroup}>
          <Image src="/../public/pokeball.png" alt="" width={70} height={70} className={styles.image}/>
          <h1 className={styles.title}>
            My Pokedex
          </h1>
          <p className={styles.subtitle}>Click on a pokémon to see its details</p>
        </div>

        <hr className={styles.hr}/>

        <ul className={styles.list}>
          {pokemon.map((poke, index) => (
            <li key={index} className={styles.listItem}>
              <Link href={`/pokemon/${index +1}`}>
                <a>
                  <img src={poke.image} alt={poke.name} />
                  <div>
                    <span>{"#"+ ("00" + (index + 1)).slice(-3)}</span>
                    <h3>{poke.name}</h3>
                  </div> 
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </ Layout>
      
    </section>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
  const { results } = await res.json()
  const pokemon = results.map((poke, index) => {
    const paddedId = ("00" + (index + 1)).slice(-3)
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`

    return { ...poke, image}
  })

  return {
    props: { pokemon }
  }
}


