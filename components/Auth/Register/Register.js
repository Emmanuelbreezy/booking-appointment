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

function verifyAuth(){
    const _token = localStorage.getItem('tokenID');
    const _userId = localStorage.getItem('uID');
    const checkAuth = _token && _userId ? true : false;

    return [_token,_userId,checkAuth];
}
    
export default function RegisterUI() {
    const [loading,setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const [_token,_userId,checkAuth] = verifyAuth();
        if(checkAuth){
            router.push('/');
          }
    }, [verifyAuth]);


    const handleClick = () => setShow(!show);

    const handleSubmitToApi = (data) => {
        if(data){
            setLoading(true);
            fetch('/api/auth/register',{
                method:'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json()
            }).then(data => {
                setTimeout(()=>{
                    setLoading(false);
                    router.push('/auth/login');
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
            username:'',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .required('Required'),
            email: Yup.string()
              .required('Required'),
            password: Yup.string()
              .required('Required'),
          }),
          onSubmit: values => {
              const obj = {
                  username: values.username,
                  email: values.email,
                  password: values.password
              }
              handleSubmitToApi(obj);
        },
    })


    return (
        <Box height="auto" pb="10">
        <Box pt="3rem" pb="2rem">
            <Container maxW={{base:"container.sm"}}>
                <Box  display="flex" alignItems="center" justifyContent="center">
                    <Box  shadow="md"  width={{base:"100%",lg:"70%"}} pt="2rem" px="2rem" pb="6rem">
                        <form onSubmit={formik.handleSubmit}>
                            <Heading w="100%" as="h5" fontSize="2.2rem" textAlign=""  fontFamily="'Poppins', sans-serif">
                                <Text>Join Bookme Today Appointment made easy</Text>
                            </Heading>
                            <Box mt="1.5rem">
                                <FormControl id='username' isInvalid={formik.errors.username && formik.touched.username}>
                                    <Text>Username</Text>
                                    <Input type='text'
                                        name="username"
                                        placeholder='Enter Username'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username} 
                                     />
                                     {formik.touched.username && formik.errors.username ? (
                                        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                                             
                                    ) : null}
                                </FormControl>
                            </Box>
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
                            <Button type="submit" isLoading={loading} loadingText={`${loading ? 'Registering...': ''}`}  bg="#0069FF" _hover={{bg:"#0069FF",opacity:".6"}} color="white" w="100%" >Sign up</Button>
                    

                            <Box mt="0.3rem">
                                <FormControl>
                                <FormHelperText textAlign="center">Already have an account <Link href="/auth/login"><a style={{color:"#0069FF", textDecoration:"underline"}}>Login here</a></Link></FormHelperText>
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
