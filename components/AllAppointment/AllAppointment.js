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
    Button,
    Spinner
  } from '@chakra-ui/react';

  import {displayTimeFormat,displayDateFormat} from '../../utils/covert_time_date_format';


export default function AllAppointment() {
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState();

    useEffect(() => {
        setLoading(true);
        fetchPaginatedAppointment(currentPage);
    }, []);

    const fetchPaginatedAppointment = (currentPage) => {
        fetch(`/api/all-appointment?page=${currentPage}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
          }).then(resp => {
              return resp.json()
          }).then(dataRes => {
              console.log(dataRes,'datares')
                setAllData(dataRes.data);
                setTotal(dataRes.total);
              setLoading(false);
          }).catch(err => {
              console.log(err);
              setLoading(false);
          })
    }

    const handleDeleteFunc = (id) => {
        console.log(id,'')
    }

    return (
        <Box>
        <Container maxW={{base:"container.xlg",lg:"container.lg"}}>
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
                <Table resize="horizontal"  border="1px solid #f2f2f2" variant='striped' colorScheme='gray'>
                    <Thead py={"2rem"}>
                        <Tr>
                        <Th>AppointmentID</Th>
                        <Th>Username</Th>
                        <Th>Appointment Start Time</Th>
                        <Th>Appointment End Time</Th>
                        <Th>Appointment Date</Th>
                        <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {allData.map(item => {
                            return (
                                <Tr key={item.aid}>
                                    <Td>{item.aid}</Td>
                                    <Td>no name</Td>
                                    <Td>{displayTimeFormat(item.startTime)}</Td>
                                    <Td>{displayTimeFormat(item.endTime)}</Td>
                                    <Td>{displayDateFormat(item.date)}</Td>
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
           <Box mt="1.rem" mb="2rem" display="flex" alignItems="center" justifyContent="end" >
                        <Box display="flex" alignItems="center">
                            <Box as="a" cursor="pointer" w="auto" bg="#f2f2f2" px={3} py={2} border="1px solid #ddd" >
                                Previous
                            </Box>
                            <Box as="a" ml="0.5rem" cursor="pointer"  w="auto" bg="#f2f2f2" px={4} py={2} border="1px solid #ddd">
                                1
                            </Box>
                            <Box as="a" ml="0.5rem" cursor="pointer"  w="auto" bg="#f2f2f2" px={4} py={2} border="1px solid #ddd">
                                2
                            </Box>
                            <Box as="a" ml="0.5rem" cursor="pointer"  w="auto" bg="#f2f2f2" px={4} py={2} border="1px solid #ddd">
                                3
                            </Box>
                            <Box as="a"  ml="0.5rem" cursor="pointer" w="auto" bg="#f2f2f2" px={3} py={2} border="1px solid #ddd" >
                                Next
                            </Box>
                        </Box>
                </Box>
        </Container>
    </Box>
    )
}