import React from 'react';
import Link from 'next/link';
import { Box,Tabs,TabList,Tab,Container,Heading,Button } from '@chakra-ui/react';

export default function NavTab() {
    return (
        <Box bg='white' w='100%' p={4} pb={0} mb={2} shadow="lg">
            <Container pt={1} maxW={{base:"container.lg"}}>
                <Box display="flex" alignItems="start" justifyContent="space-between">
                    <Tabs border="none">
                        <Heading mb={4} fontWeight="normal"  fontSize="1.5rem" color="blackAlpha.700" fontFamily="'Poppins', sans-serif">My Bookings</Heading>
                        <TabList border="none" >
                            <Tab fontSize="0.955rem" pl={0} _hover={{ color:"blackAlpha.300"}} _selected={{ color: '#333',borderBottom:'3px solid #0069FF' }} fontFamily="'Poppins', sans-serif">Overview</Tab>
                        </TabList>
                    </Tabs>
                    <Link href="/new-booking">
                        <Button bg="#0069FF" _hover={{bg:"#0069FF",opacity:"0.6"}} fontWeight="light" color="white">
                          <svg style={{width:"17px", height:"17px",marginRight:"0.20rem"}} version="1.1" id="Plus" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                                viewBox="0 0 20 20" enableBackground="new 0 0 20 20" >
                            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z"/>
                            </svg>
                            Book New Appointment
                        </Button>
                    </Link>
                </Box>
               
            </Container>
        </Box>

    )
}
