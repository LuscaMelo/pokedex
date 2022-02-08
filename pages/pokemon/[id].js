import Link from 'next/link';
import Layout from '../../components/Layout';
import Styles from '../../styles/Pokemon.module.css'

export default function PokemonItem({pokemon}) {
    
  return (

    <Layout>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <img className={Styles.img} src={pokemon.image} />
          <span>{"#"+ ("00" + pokemon.id).slice(-3)}</span>
          <h1 className={Styles.title}>{pokemon.name}</h1>

          <div className={Styles.line}>
            <div>
              <p>Height</p>
              <span>{pokemon.height}</span>
            </div>

            <div>
              <p>Weight</p>
              <span>{pokemon.weight}</span>
            </div>
          </div>

          <div>
            <div className={Styles.abilities}>
              <p>Abilities:</p>
              <div className={Styles.abilities}>
                {pokemon.abilities.map((item, index) => (
                  <button key={index}>{item.ability.name}</button> 
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <button className={Styles.button}>
            <a>
              <i className="fas fa-arrow-circle-left"></i>
              All Pokémons
            </a>
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon = await res.json()
  const paddedId = ('00' + id).slice(-3)
  pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
      

  return {
    props: { pokemon }
  }
}

  