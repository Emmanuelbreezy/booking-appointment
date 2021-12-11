import React,{useEffect, useState} from 'react';
import { Box,Container,Text,SimpleGrid,Stack,Avatar,AvatarBadge} from '@chakra-ui/react';
import BookingCard from '../Card/BookingCard';


export default function HomeUI() {
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('/api/appointments',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
          }).then(resp => {
              return resp.json()
          }).then(dataRes => {
              setDataList(dataRes.data)
              setLoading(false);
          }).catch(err => {
              console.log(err);
              setLoading(false);
          })
    }, [setDataList,setLoading])

    return (
        <Box bg="#fafafa" height="auto" pb="10">
             <Container pt="4rem" maxW={{base:"container.lg"}}>
                 <Box borderBottom="1px solid #ddd">
                    <Box mb={3}>
                    <Stack direction='row' spacing={2}>
                        <Avatar size='sm'>
                            <AvatarBadge boxSize='1.0em' bg='green.500' />
                        </Avatar>
                        <Text fontSize="1.1rem"  fontWeight="light">Emmanuel Umeh</Text>
                    </Stack>
                    </Box>
                 </Box>
                 <br /> 
                
                   {loading && !dataList.length > 0 ?  (
                      <Box w="100%" p="8.5rem" textAlign="center">
                          <Text>Loading...</Text>
                    </Box>
                      ): 
                      (<SimpleGrid columns={[2, null, 3]} spacing='40px' >
                        {dataList.map(item => {
                          return  <BookingCard key={item.aid} data={item} />
                        })}
                     </SimpleGrid>)

                }
                   
                 
                
             </Container>
        </Box> 
    )
}

