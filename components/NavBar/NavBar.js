import React from 'react';
import Link from 'next/link';
import { Box,Container,Heading,Text,List,ListItem } from '@chakra-ui/react';

export default function NavBar() {
    return (
        <div className="header">
            <Box bg="white" w='100%' p={4} borderBottom="1px solid #f5f5f5">
               <Container maxW={{base:"container.lg"}}>
                    <Box  display="flex" alignItems="center" justifyContent="space-between">
                        <Link href="/">
                            <a>
                                <Heading as="h5" fontSize="1.7rem"  fontFamily="'Poppins', sans-serif" display="flex" alignItems="center">
                                    <Text>Book</Text>
                                    <Text>me</Text>
                                </Heading>
                            </a>
                        </Link>
                        <Box>
                           <List display="flex" alignItems="center">
                               <ListItem ml={5}>
                                  <a href=""> <Text fontWeight="light" fontFamily="'Poppins', sans-serif">Support</Text></a>
                                  </ListItem>
                               <ListItem ml={2}>
                                    <a><Text fontWeight="light" fontFamily="'Poppins', sans-serif">Signout</Text></a>  
                                </ListItem>
                           </List>
                        </Box>
                    </Box>
               </Container>
            </Box>
        </div>
    )
}
