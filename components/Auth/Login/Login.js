import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box,Container,Text,Heading,Button,Input,InputGroup,
          FormControl,InputRightElement,
          FormErrorMessage,
          FormHelperText
       } 
      from '@chakra-ui/react';

import verifyAuth from '../../../utils/getTokenLocalStorage';


      
export default function LoginUI() {
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const [_token,_userId,checkAuth] = verifyAuth();
        if(checkAuth){
            router.push('/');
          }
    }, [verifyAuth])

    const handleClick = () => setShow(!show);

    const handleSubmitToApi = (data) => {
        if(data){
            setLoading(true);
            fetch('/api/auth/login',{
                method:'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json()
            }).then(data => {
                if(data.tokenID === undefined  || data.uID === undefined){
                    setLoading(false);
                    localStorage.removeItem('userId');
                    localStorage.removeItem('token');
                    return router.replace('/auth/login');

                }
                localStorage.setItem('tokenID',data.tokenID);
                localStorage.setItem('uID',data.uID);
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
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
              .required('Required'),
            password: Yup.string()
              .required('Required'),
          }),
          onSubmit: values => {
            const obj = {
                email: values.email,
                password: values.password
            }
            handleSubmitToApi(obj);
        },
    })


    return (
        <Box height="auto" pb="10">
            <Box pt="5rem" pb="2rem">
                <Container maxW={{base:"container.sm"}}>
                    <Box  display="flex" alignItems="center" justifyContent="center">
                        <Box  shadow="md"  width={{base:"100%",lg:"70%"}} pt="2rem" px="2rem" pb="6rem">
                            <form onSubmit={formik.handleSubmit}>
                                <Heading as="h5" fontSize="2.5rem" textAlign="center"  fontFamily="'Poppins', sans-serif">
                                    <Text>Log in to Bookme</Text>
                                </Heading>
                                <Box mt="1.5rem">
                                    <FormControl id='email' isInvalid={formik.errors.email && formik.touched.email}>
                                        <Text>Email address</Text>
                                        <Input type='email'
                                            name="email"
                                            placeholder='Enter email'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} 
                                         />
                                         {formik.touched.email && formik.errors.email ? (
                                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                                 
                                        ) : null}
                                    </FormControl>
                                </Box>
                                <Box mt="1.0rem">
                                <FormControl id='password' isInvalid={formik.errors.password && formik.touched.password}>
                                    <Text>Password</Text>
                                        <InputGroup>
                                            <Input
                                                name="password"
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password} 
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {formik.touched.password && formik.errors.password ? (
                                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                                 
                                        ) : null}
                                    </FormControl>
                                </Box>
                                <br />
                                <Button type="submit" isLoading={loading} loadingText={`${loading ? 'Authenticating...': ''}`}  bg="#0069FF" _hover={{bg:"#0069FF",opacity:".6"}} color="white" w="100%" >Continue</Button>
                    
                               <Box mt="0.3rem">
                                   <FormControl>
                                    <FormHelperText textAlign="center">Don't have an account <Link href="/auth/register"><a style={{color:"#0069FF", textDecoration:"underline"}}>Signup here</a></Link></FormHelperText>
                                    </FormControl>
                               </Box>
                        </form>
                        </Box>
                     </Box>
                    
                </Container>
            </Box>
        </Box>
    )
}
