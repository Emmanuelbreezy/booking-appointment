import React,{useEffect,useState} from 'react'
import {
    Box,
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Spinner
  } from '@chakra-ui/react';


export default function AllUser() {
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        setLoading(true);
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(`/api/all-users`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
          }).then(resp => {
              return resp.json()
          }).then(dataRes => {
              console.log(dataRes,'datares')
               setUsersData(dataRes.data);
              setLoading(false);
          }).catch(err => {
              console.log(err);
              setLoading(false);
          })
    }
    return (
        <Box>
            <Container maxW={{base:"container.lg"}}>
               <Box></Box>
               <Box mt="3rem">
               {loading ?  (
                      <Box w="100%" p="8.5rem" textAlign="center">
                            <Spinner color='blue.500' size='xl'  thickness='1px' speed='0.65s' emptyColor='gray.200' />
                    </Box>
                ): 
                (
                    <>
                     <Box mt="3rem" display="flex" alignItems="center" overflowX="auto"> 
                  <Table border="1px solid #f2f2f2" variant='striped' colorScheme='gray'>
                    <TableCaption>Registered Users Table</TableCaption>
                    <Thead py={"2rem"}>
                        <Tr>
                        <Th>UserID</Th>
                        <Th>Name</Th>
                        <Th>Registered Date</Th>
                        <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    { usersData.map(item => {
                        return (
                            <Tr key={item._id}>
                                <Td>{item._id}</Td>
                                <Td>{item.username}</Td>
                                <Td>{item.createdAt}</Td>
                                <Td>
                                    <Button bg="red.100" _hover={{bg:"red.200" }} _focus={{bg:"red.100" }}  onClick={() => handleDeleteFunc(item._id)}>Delete</Button>
                                </Td>
                        </Tr>
                        )
                      })}
                    </Tbody>
                    </Table>
                    </Box>
                <br />
                
              </>)
            }
               </Box>
            </Container>
        </Box>

    )
}