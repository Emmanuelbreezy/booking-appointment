import React from 'react';
import Link from 'next/link';
import { Box,Container,Text,SimpleGrid,Stack,Avatar,AvatarBadge} from '@chakra-ui/react';
import BookingCard from '../Card/BookingCard';


export default function HomeUI() {

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
                 <SimpleGrid columns={[2, null, 3]} spacing='40px' >
                   <BookingCard />
                   <BookingCard />
                   <BookingCard />
                   <BookingCard />
                   <BookingCard />
                   <BookingCard />
                </SimpleGrid>
             </Container>
        </Box>
    )
}
