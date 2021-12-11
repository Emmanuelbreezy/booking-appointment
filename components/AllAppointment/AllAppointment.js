import React from 'react'
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
    Button
  } from '@chakra-ui/react'


export default function AllAppointment() {
    return (
        <Box>
        <Container maxW={{base:"container.lg"}}>
           <Box></Box>
           <Box mt="3rem">
              <Table border="1px solid #f2f2f2" variant='striped' colorScheme='blue'>
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
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                        <Td>
                            <Button bg="red">Delete</Button>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td>30.48</Td>
                        <Td>
                            <Button bg="red">Delete</Button>
                        </Td>
                    </Tr>
                </Tbody>
                </Table>
           </Box>
        </Container>
    </Box>
    )
}