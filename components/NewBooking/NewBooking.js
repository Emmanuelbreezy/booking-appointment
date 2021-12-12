import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box,Container,Text,Button,Input,InputGroup,InputLeftAddon,FormErrorMessage,FormControl } from '@chakra-ui/react';
import Calendar from '../Calendar/Calendar';

import verifyAuth from '../../utils/getTokenLocalStorage';



export default function NewBookingUI() {
    const router = useRouter()
    const [loading,setLoading] = useState(false);
    const [_date,setDate] = useState('');
    const [token,setToken] = useState('');


    useEffect(() => {
        const [_token,_userId,checkAuth] = verifyAuth();
        if(!checkAuth){
            return router.replace('/auth/login');
        }
        setToken(_token);

    }, [verifyAuth])


    const handleDateClick = (args) => {
       if(args.dateStr){
           setDate(args.dateStr);
       }
    }

    const handleSubmitToApi = (data) =>{
        if(data && token){
            setLoading(true);
            fetch('/api/new-appointment',{
                method:'POST',
                body: JSON.stringify(data),
                headers:{
                    Authorization: 'Bearer '+ token,
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json()
            }).then(data => {
                console.log(data,'___8uu')
                
                setTimeout(()=>{
                    setLoading(false);
                    router.push('/');
                },1000)

            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
               
                               
        }
    }

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            startTime: '',
            endTime: '',
        },
        validationSchema: Yup.object({
            startTime: Yup.string()
              .required('Required'),
            endTime: Yup.string()
              .required('Required'),
          }),
          onSubmit: values => {
              const obj= {
                  startTime:values.startTime,
                  endTime:values.endTime,
                  date: _date
              }
            handleSubmitToApi(obj);
        },
    })



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
                        <Text fontFamily="'Poppins', sans-serif" color="#000" fontSize={{lg:"1.28rem"}} mb='3'fontWeight='normal'lineHeight='tight'>
                            Book New Appointment
                        </Text>
                    </Box>
                    <Box></Box>
                </Box>
                </Container>
            </Box>
            <Box height="auto"  pt="5">
                <Container  px={{base:5, md: 7, lg:7}} maxW={{base:"container.lg"}}>
                    <Box mb="2rem" w="100%" textAlign="center">
                        <Text fontWeight="light" fontSize="1.0rem">Select Date and Time</Text>
                    </Box>
                    <Box>
                        <form onSubmit={formik.handleSubmit}>
                            <Box pt={3} pb={12} display={{lg:"flex"}} alignItems="center" justifyContent="space-between">
                                <Box width={{lg:"45%"}} display={{lg:"flex"}} alignItems="center">
                                    <Box>
                                       <FormControl isInvalid={formik.errors.startTime && formik.touched.startTime}>
                                        <Text mb="2">Start Time</Text>
                                            <InputGroup>
                                                <InputLeftAddon />
                                                <Input type='time'  step="3600" name="startTime"cursor="pointer" placeholder='Start Time'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.startTime} 
                                                />
                                            </InputGroup>
                                                {formik.touched.startTime && formik.errors.startTime ? (
                                                    <FormErrorMessage>{formik.errors.startTime}</FormErrorMessage>
                                                 
                                                ) : null}
                                        </FormControl>
                                    </Box>
                                    <Box ml={{lg:"5"}}>
                                      <FormControl isInvalid={formik.errors.endTime && formik.touched.endTime}>
                                        <Text mb="2">End Time</Text>
                                        <InputGroup>
                                            <InputLeftAddon />
                                            <Input type="time" name="endTime"  isDisabled={!formik.values.startTime} cursor="pointer" placeholder='End Time'
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}
                                             value={formik.values.endTime}  />
                                        </InputGroup>
                                        {formik.touched.endTime && formik.errors.endTime ? (
                                            <FormErrorMessage>{formik.errors.endTime}</FormErrorMessage>
                                        ) : null}
                                      </FormControl>
                                    </Box>
                                    
                                </Box>
                                <Box width={{lg:"40%"}} mt={{base:7, md:0, lg:0}}>
                                    <Text>Define how long the meeting will be. It can be as long as 1 hour.</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Calendar  handleDateClick={handleDateClick}/>
                                <FormControl isInvalid={!_date}>
                                    <Input type="date" name="date" disabled cursor="pointer" placeholder='Date' 
                                    value={_date}  />
                                    {!_date ? (
                                        <FormErrorMessage>Required</FormErrorMessage>
                                    ) : null}
                                 </FormControl>
                            </Box>

                            <Box mt={8} display="flex" justifyContent="flex-end">
                                <Button isLoading={loading} loadingText={`${loading ? 'Booking...': ''}`} type="submit" bg="#0069FF" color="#fff" _focus={{bg:"#0069FF",opacity:"1"}} _hover={{bg:"#0069FF",opacity:"0.8"}} w="100%" >Book Appointment</Button>
                            </Box>
                        </form>

                    </Box>
                
                      
                </Container>
            </Box>
        </Box>
    )
}

