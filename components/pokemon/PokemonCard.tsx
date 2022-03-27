import { Card, Grid, Row, Text } from "@nextui-org/react"
import Image from "next/image"
import { FC } from "react"
import { SmallPokemon } from "../../interfaces"
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon
}

// export const PokemonCard:FC<Props> = ({pokemon: {id, name, image}}) => {
export const PokemonCard:FC<Props> = ({pokemon}) => {
    const {id, name, image} = pokemon

    const router = useRouter();

    const onClick = () => {
        // router.push(`/pokemon/${pokemon.id}`)
        router.push(`/name/${pokemon.name}`)
    }    

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
    <Card 
        hoverable
        clickable
        onClick={onClick}
    >
      <Card.Body css={{p:1}}>
        {/* <Card.Image 
          src={image}
          width="100%"
          height={140}
        /> */}
        
        <Image src={image} alt={name} width="100%" height={140} priority={id<7?true:false}/>

      </Card.Body>
      <Card.Footer>
        <Row justify='space-between'>
          <Text transform='capitalize'>{name}</Text>
          <Text>#{id}</Text>
        </Row>
      </Card.Footer>
    </Card>
  </Grid>
  )
}
