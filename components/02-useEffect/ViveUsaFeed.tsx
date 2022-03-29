import { useEffect, useState } from "react";
import axios from 'axios'
import { NodeListResponse, NodesListResponse } from "../../interfaces";
import { Card, Image, Container, Grid, Text } from '@nextui-org/react';

const api = axios.create(
    {
        baseURL: 'https://www.viveusa.mx'
    }
)










export const ViveUsaFeed =  () => {

    const [state, setState] = useState<NodeListResponse[]>([])

    useEffect (() => {
        console.log("VIVE FEED");
        //   console.log(state);
        const fetchFeed = async() => {
            const {data} = await api.get<NodesListResponse>('/api/feeds/vive-usa/mundo');
            return data
        }

        fetchFeed()
            .then((data) => {
                console.log(data.nodes)
                setState(data.nodes);
            })
            .catch((e) => {console.log(e)})
        //   const { data } = await api.get(`/api/feeds/vive-usa/mundo`)      
    }, [])
    
  return (
    <div>
        <h3>ViveUsaFeed</h3>
        <Grid.Container gap={1}>
        {
            state.map((node,i) => {
                return (
                    <Grid xs={12} sm={6} md={3} xl={2} key={i}>
                        <Card>
                            <Card.Header><Text h4>{node.title}</Text></Card.Header>
                            <Card.Body>
                                <Card.Image 
                                    src={node.images.desktop}
                                    alt={node.images.alt} width="100%" height={200}
                                ></Card.Image>
                            </Card.Body>
                        </Card>
                    </Grid>
                )
            })
            
        }
        </Grid.Container>
    </div>
  )
}
