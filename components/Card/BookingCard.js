import React from 'react';
import Link from 'next/link';
import { Box,Text } from '@chakra-ui/react';


export default function BookingCard(props) {
  

    const displayTimeFormat = (time)=>{
        var hours, minutes, meridian;
        hours = time.split(':')[0];
        minutes = time.split(':')[1];
        if(hours > 12){
            meridian = 'pm';
            hours -= 12;
        }else if(hours < 12){
            meridian = 'am';
            if(hours == 0){
                hours = 12;
            }
        }else {
            meridian = 'pm';
        }

        var fulltime = hours + ':' + minutes+ ' ' + meridian;

        return fulltime;
    }

    const displayDateFormat = (date)=>{
        const mydate = new Date(props.data.date);
        return mydate.toDateString();
    }

    const currentDate = new Date();
    const GiveDate = new Date(props.data.date);
    const checkIfGreaterThanTodayDate = GiveDate > currentDate ? 'white' : '#eee';
    const checkIfBorder = GiveDate > currentDate ? 'yellow.400' : 'black.400';

    return (
        <a>
            <Box cursor="pointer" bg={checkIfGreaterThanTodayDate} borderTop="2px solid" borderTopColor={checkIfBorder} _hover={{border:"2px solid #0069FF"}} shadow="md" maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden'>
             <Box pt="7" pb="3">
                <Box px="3">
                    <Text fontFamily="'Poppins', sans-serif" color="#000" fontSize="1.28rem" mb='3'fontWeight='normal'lineHeight='tight'
                        isTruncated
                    >
                    30 Minute Meeting
                    </Text>
                    <Box mt="2"  >
                        <Text color="blackAlpha.400" fontSize="0.7rem">TIME</Text>
                        <Box display="flex" alignItems="center">
                        <svg style={{width:"15px", height:"15px",marginRight:"0.20rem"}} version="1.1" id="Stopwatch" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 20 20" enableBackground="new 0 0 20 20" >
                            <path fill="gray" d="M7.376,6.745c-0.447,0.275,1.197,4.242,1.598,4.888c0.35,0.569,1.093,0.742,1.658,0.394
                                c0.568-0.352,0.745-1.094,0.395-1.66C10.63,9.719,7.822,6.469,7.376,6.745z M7.041,2.402C7.969,2.079,8.963,1.9,10,1.9
                                s2.031,0.179,2.959,0.502c0.329,0.114,0.765-0.115,0.572-0.611c-0.141-0.36-0.277-0.712-0.332-0.855
                                c-0.131-0.339-0.6-0.619-0.804-0.665C11.623,0.097,10.823,0,10,0S8.377,0.097,7.604,0.271C7.4,0.317,6.932,0.597,6.801,0.936
                                C6.746,1.079,6.609,1.431,6.469,1.791C6.276,2.287,6.712,2.517,7.041,2.402z M19.098,3.186c-0.192-0.23-0.396-0.455-0.613-0.672
                                c-0.216-0.217-0.441-0.42-0.67-0.613c-0.153-0.129-0.603-0.234-0.888,0.051c-0.284,0.285-1.648,1.647-1.648,1.647
                                c0.402,0.288,0.793,0.605,1.155,0.966c0.362,0.361,0.677,0.752,0.966,1.155c0,0,1.363-1.362,1.647-1.647
                                C19.333,3.787,19.228,3.338,19.098,3.186z M10,2.9c-4.475,0-8.101,3.626-8.101,8.1c0,4.475,3.626,8.101,8.101,8.101
                                c4.473,0,8.1-3.626,8.1-8.101C18.1,6.527,14.473,2.9,10,2.9z M10,17.101c-3.368,0-6.1-2.731-6.1-6.1s2.731-6.1,6.1-6.1
                                s6.101,2.731,6.101,6.1C16.101,14.369,13.369,17.101,10,17.101z"/>
                            </svg>
                            <Text  color="blackAlpha.700" fontFamily="'Poppins', sans-serif" fontWeight='normal' fontSize="0.9rem">{displayTimeFormat(props.data.startTime)} - {displayTimeFormat(props.data.endTime)} </Text>
                        </Box>
                    </Box>
                    <Box mt="2" >
                        <Text color="blackAlpha.400" fontSize="0.7rem">DATE</Text>
                        <Box display="flex" alignItems="center">
                        <svg style={{width:"15px", height:"15px",marginRight:"0.20rem"}} version="1.1" id="Calendar" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                                viewBox="0 0 20 20" enableBackground="new 0 0 20 20" >
                            <path fill="gray" d="M17,3h-1v2h-3V3H7v2H4V3H3C1.899,3,1,3.9,1,5v12c0,1.1,0.899,2,2,2h14c1.1,0,2-0.9,2-2V5C19,3.9,18.1,3,17,3
                                z M17,17H3V9h14V17z M6.5,1h-2v3.5h2V1z M15.5,1h-2v3.5h2V1z"/>
                            </svg>
                            <Text color="blackAlpha.700" fontFamily="'Poppins', sans-serif" fontWeight='normal' fontSize="0.9rem">{displayDateFormat(props.data.date)}</Text>
                        </Box>
                    </Box>
                </Box>
                <Box borderTop="1px solid" pl="3" pt="2" borderTopColor="blackAlpha.50"   display='flex' mt='6' alignItems='center'>
                    <Box display="flex" alignItems="center">
                        <Text color={GiveDate > currentDate ? "#0069FF": "gray.500"}>{GiveDate > currentDate ? 'active appointment': 'inactive appointment'}</Text>
                        <svg style={{width:"15px", height:"15px",marginLeft:"0.25rem"}} version="1.1" id="Export" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                            viewBox="0 0 20 20" enableBackground="new 0 0 20 20" >
                            <path fill="#0069FF" d="M15,15H2V6h2.595c0,0,0.689-0.896,2.17-2H1C0.447,4,0,4.449,0,5v11c0,0.553,0.447,1,1,1h15
                            c0.553,0,1-0.447,1-1v-3.746l-2,1.645V15z M13.361,8.05v3.551L20,6.4l-6.639-4.999v3.131C5.3,4.532,5.3,12.5,5.3,12.5
                            C7.582,8.752,8.986,8.05,13.361,8.05z"/>
                        </svg>
                      
                    </Box>
                   
                </Box>
                </Box>
        </Box>
    </a>
    )
}
