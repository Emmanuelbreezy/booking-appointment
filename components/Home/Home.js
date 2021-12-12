import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box,Container,Text,SimpleGrid,Stack,Avatar,AvatarBadge,Spinner,Button} from '@chakra-ui/react';
import BookingCard from '../Card/BookingCard';

import verifyAuth from '../../utils/getTokenLocalStorage';

  

export default function HomeUI() {
    const [loading, setLoading] = useState(true);
    const [dataList, setDataList] = useState([]);
    const [userName, setUserName] = useState('')

    const router = useRouter();

    useEffect(() => {
        const [_token,_userId,checkAuth] = verifyAuth();
        if(!checkAuth){
            return router.replace('/auth/login');
        }
        setLoading(true);
        fetchAllAppointmentByUser(_token);
        
    }, [verifyAuth,setDataList,setLoading])


    const fetchAllAppointmentByUser = (_token) => {
      return fetch('/api/appointments',{
                method:'GET',
                headers:{
                    Authorization: 'Bearer '+ _token,
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json()
            }).then(dataRes => {
                setDataList(dataRes.data)
                setUserName(dataRes.username)
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <Box bg="#fafafa" height="auto" pb="10rem">
             <Container pt="4rem" maxW={{base:"container.lg"}}>
                 <Box borderBottom="1px solid #ddd">
                    <Box mb={3}>
                    {loading && !userName ? (<Text>Loading...</Text>) :
                        (<Stack direction='row' spacing={2}>
                            <Avatar size='sm'>
                                <AvatarBadge boxSize='1.0em' bg='green.500' />
                            </Avatar>
                            <Text fontSize="1.1rem"  fontWeight="light">{userName}</Text>
                        </Stack>)
                     }
                    </Box>
                 </Box>
                 <br /> 
                
                   {loading ? (
                      <Box w="100%" p="8.5rem" textAlign="center">
                          <Spinner color='blue.500' size='xl'  thickness='1px' speed='0.65s' emptyColor='gray.200' />
                    </Box>
                      ): 
                      (<>
                      {!Array.isArray(dataList) || !dataList.length ? (

                      <Box width="50%" margin="0 auto" textAlign="center"  p="8.5rem" pb="6rem">
                         
                         <Text textAlign="center" fontWeight="thin">No Appointment Booked</Text>
                         <Link href="/new-booking"><Button w="50px" h="50px" borderRadius="50%" mt="1rem" bg="#0069FF" _hover={{bg:"#0069FF",opacity:"0.6"}} fontWeight="light" color="white">
                            <svg style={{width:"30px", height:"30px"}} version="1.1" id="Plus" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                                    viewBox="0 0 20 20" enableBackground="new 0 0 20 20" >
                                <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"/>
                                </svg>
                        </Button></Link>

                      </Box>
                      
                      ):(
                        <SimpleGrid columns={[2, null, 3]} spacing='40px' >
                            {dataList.map(item => {
                            return  <BookingCard key={item.aid} data={item} />
                            })}
                        </SimpleGrid>)
                    }
                     </>)

                }
                   
                 
                
             </Container>
        </Box> 
    )
}

