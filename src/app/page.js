`use client`

import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Navbar from "./components/Navbar";



export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>

      <Box sx={{my: 6}} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
        <Box 
        display='flex'
        padding='30px'
        flexDirection='row'
        justifyContent='space-between'
        flexWrap='wrap'
        gap={5}
        >
          <Box flex={1}>
          <Typography>Generate Flashcard Instantly</Typography>
          <Typography>You can generate flashcards almost immediately by putting in 
            your word. </Typography>
          </Box>

          <Box flex={1}>
          <Typography>Generate Flashcard Instantly</Typography>
          <Typography>You can generate flashcards almost immediately by putting in 
            your word. </Typography>
          </Box>

          <Box flex={1}>
          <Typography>Generate Flashcard Instantly</Typography>
          <Typography>You can generate flashcards almost immediately by putting in 
            your word. </Typography>
          </Box>
        </Box>
      </Box>

    </Container>
  );
}
