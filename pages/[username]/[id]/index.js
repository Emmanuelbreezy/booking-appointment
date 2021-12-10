import React from 'react';
import Head from 'next/head';
import Layout from '../../../hoc/Layout/Layout';
import Detail from '../../../components/Detail/Detail';

export default function ViewBookings() {
  return (
    <div>
      <Head>
        <title>My Appointment - Bookme </title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet" />
      </Head>

      <Layout>
          <Detail />
      </Layout>
      
    </div>
  )
}