import React,{useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box,Container,Heading,Text,List,ListItem,Button } from '@chakra-ui/react';

import verifyAuth from '../../utils/getTokenLocalStorage';



export default function NavBar() {
    const router = useRouter();
    const [auth, setAuth] = React.useState(false);

    useEffect(() => {
        const [_token,_userId,checkAuth] = verifyAuth();
        setAuth(checkAuth);
    }, [verifyAuth]);

    const logoutHandler = () =>{
        localStorage.removeItem('uID');
        localStorage.removeItem('tokenID');
        router.replace('/auth/login');
      }
    
    return (
        <div className="header">
            <Box bg="white" w='100%' p={4} borderBottom="1px solid #f5f5f5">
               <Container maxW={{base:"container.lg"}}>
                    <Box  display="flex" alignItems="center" justifyContent="space-between">
                        <Link href="/">
                            <a>
                                <Heading as="h5" fontSize="1.7rem"  fontFamily="'Poppins', sans-serif" display="flex" alignItems="center">
                                    <Text>Book</Text>
                                    <Text color="#0069FF">me</Text>
                                </Heading>
                            </a>
                        </Link>
                        <Box>
                           <List display="flex" alignItems="center">
                               {auth ? (
                                   <>
                                <ListItem ml={5}>
                                    <a> <Text cursor="pointer" fontWeight="light" fontFamily="'Poppins', sans-serif">Support</Text></a>
                                    </ListItem>
                                <ListItem ml={2}>
                                        <a ><Text onClick={logoutHandler} cursor="pointer" _hover={{textDecoration:"underline"}} fontWeight="light" fontFamily="'Poppins', sans-serif">Signout</Text></a>  
                                    </ListItem>
                                   </>
                               ):(
                                <>
                                  <ListItem >
                                        <Link href="/auth/login">
                                            <Box>
                                                <Text cursor="pointer" fontWeight="light" fontFamily="'Poppins', sans-serif">
                                                    Signin
                                                </Text>
                                            </Box>
                                        </Link>
                                    </ListItem>
                                    <ListItem ml={2}>
                                      <Link href="/auth/register">
                                          <Box>
                                              <Button bg="#0069FF" _hover={{bg:"#0069FF",opacity:".5"}} color="white">Signup</Button>
                                          </Box>
                                          </Link>
                                    </ListItem>
                                   </>  
                               )}
                           </List>
                        </Box>
                    </Box>
               </Container>
            </Box>
        </div>
    )
}
