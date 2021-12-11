import React from 'react';
import Head from 'next/head';
import {Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Layout from '../../hoc/Layout/Layout';
import AllUser from '../../components/AllUser/AllUser';
import AllAppointment from '../../components/AllAppointment/AllAppointment';

export default function Admin() {
  return (
    <div>
      <Head>
        <title>Admin View -  Bookme </title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet" />
      </Head>

      <Layout>
        <Box pt="2rem" pb="2rem">
            <Box>
              <Tabs align="center" variant='enclosed'>
                <TabList>
                  <Tab>All Users</Tab>
                  <Tab>All Appointments</Tab>
                </TabList>


                <TabPanels>
                    <TabPanel>
                      <AllUser />
                    </TabPanel>
                    <TabPanel>
                      <AllAppointment />
                    </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
        </Box>
      </Layout>
      
    </div>
  )
}
