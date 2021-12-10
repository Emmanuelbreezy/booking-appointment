import React,{useState} from 'react';
import Link from 'next/link';
import { Box,Container,Text,Button,Input,InputGroup,InputLeftAddon } from '@chakra-ui/react';
import Calendar from '../Calendar/Calendar';

export default function NewBookingUI() {
    const [date,setDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');

    const handleDateClick = (args) => {
       console.log(args,'aaa');
    //    setDate(args.datestr);
    }
    return (
        <Box height="auto" pb="10">
            <Box pt="2rem" pb="2rem"  borderBottom="1px solid #f5f5f5">
                <Container maxW={{base:"container.lg"}}>
                <Box  display="flex" alignItems="baseline" justifyContent="space-between">
                    <Link href="/">
                        <Button borderRadius="15px" bg="#fff" border="1.5px solid #0069FF"  _hover={{bg:"#0069FF",opacity:"0.6",color:"white"}} fontWeight="light" color="#0069FF">
                           <svg style={{width:"15px", height:"15px",marginRight:"0.20rem"}} version="1.1" id="Chevron_thin_left" xmlns="http://www.w3.org/2000/svg"  x="0px"
                                y="0px" viewBox="0 0 20 20" enableBackground="new 0 0 20 20">
                            <path fill="#0069FF" d="M13.891,17.418c0.268,0.272,0.268,0.709,0,0.979s-0.701,0.271-0.969,0l-7.83-7.908
                                c-0.268-0.27-0.268-0.707,0-0.979l7.83-7.908c0.268-0.27,0.701-0.27,0.969,0c0.268,0.271,0.268,0.709,0,0.979L6.75,10L13.891,17.418
                                z"/>
                            </svg>
                            Back
                        </Button>
                    </Link>
                    <Box>
                        <Text fontFamily="'Poppins', sans-serif" color="#000" fontSize="1.28rem" mb='3'fontWeight='normal'lineHeight='tight'>
                            Book New Appointment
                        </Text>
                    </Box>
                    <Box></Box>
                </Box>
                </Container>
            </Box>
            <Box height="auto"  pt="5">
                <Container  px={7} maxW={{base:"container.lg"}}>
                    <Box mb="2rem" w="100%" textAlign="center">
                        <Text fontWeight="light" fontSize="1.0rem">Select Date and Time</Text>
                    </Box>
                    <Box>
                        <Box pt={3} pb={12} display="flex" alignItems="center" justifyContent="space-between">
                            <Box w={{sm:"100%",lg:"45%"}} display="flex" alignItems="center">
                                <Box >
                                    <Text mb="2">Start Time</Text>
                                        <InputGroup>
                                            <InputLeftAddon children='' />
                                            <Input type='time' cursor="pointer" placeholder='Start Time' onChange={(e) => setStartTime(e.target.value)} />
                                        </InputGroup>

                                 </Box>
                                <Box ml="5">
                                    <Text mb="2">End Time</Text>
                                    <InputGroup>
                                        <InputLeftAddon children='' />
                                        <Input type='time' cursor="pointer" placeholder='End Time' onChange={(e) => setEndTime(e.target.value)} />
                                    </InputGroup>
                                </Box>
                                
                            </Box>
                            <Box w={{sm:"100%",lg:"40%"}}>
                                <Text>Define how long the meeting will be. It can be as long as 1 hour.</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Calendar  handleDateClick={handleDateClick}/>
                        </Box>
                        <Box mt={8} display="flex" justifyContent="flex-end">
                            <Button bg="#0069FF" color="#fff" _focus={{bg:"#0069FF",opacity:"1"}} _hover={{bg:"#0069FF",opacity:"0.8"}} w="100%" >Submit Appointment</Button>
                        </Box>
                    </Box>
                
                      
                </Container>
            </Box>
        </Box>
    )
}
