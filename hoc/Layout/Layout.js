import React from 'react';
import { Box} from '@chakra-ui/react';

import NavBar from '../../components/NavBar/NavBar';


export default function Layout(props) {
    return (
        <Box className="layout">
            <NavBar />
            <main>
                {props.children}
            </main>
            <footer>
            </footer>
        </Box>
    )
}
