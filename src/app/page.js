'use client'
import Head from 'next/head';
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import Link from 'next/link';
import getStripe from "../../Utils/get-stripe";
import { useState } from 'react';


export default function Home() {
  const [price, setPrice] = useState(0)

  const handleSubmit = async () => {
    const checkoutSession = await fetch(`/api/checkout_sessions?session_id=${price}`, {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }


  return (
    <Container maxWidth="md">
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Link href="/sign-in" passHref>
          <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}}>
            Get Started
          </Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}}>
            Learn More
          </Button>
        </Link>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} >
          <Box
            sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              Simply input your text and let out software do the rest, Creating flashcards 
              has never been easier.
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              Simply input your text and let out software do the rest, Creating flashcards 
              has never been easier.
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              Simply input your text and let out software do the rest, Creating flashcards 
              has never been easier.
            </Typography>
            </Box>
          </Grid>

        </Grid>
        
      </Box>

      {/* Pricing section */}
      <Box sx={{my: 6, textAlign: 'center'}} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} >
            <Box
            sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$0.99 / Month</Typography>
              <Typography gutterBottom>
                Access to basic feature and limited storage.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => {setPrice(0.99); handleClick() } }>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} >
            <Box
            sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}
            >
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$4.99 / Month</Typography>
              <Typography gutterBottom>
                Unlimited flashcards and storage for your flashcards.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => {setPrice(4.99); handleSubmit() } }>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>

      
      </Box>

    </Container>
  );
}
