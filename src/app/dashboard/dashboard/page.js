'use client'

import { 
    Container, 
    Grid, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Button,
    Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


export default function DashBoard() {

    const {isloaded, isSigned, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flippedFC, setFlippedFC] = useState([])
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            body: text,
        }).then((res) => res.json())
        .then(data > setFlashcards(data))

    }

    const handleClick = (id) => {
        
    }


    const showFlashCard = () => {

    }
    const createFlashCard = () => {}

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} >
                    <Box
                    display={'flex'}
                    flexDirection={'row'}
                    sx={{ my: '20px'}}
                    justifyContent={'space-around'}
                    >
                        <Button variant="outlined" sx={{mx:'2px'}}>Your Flash Card Collections</Button>
                        <Button variant="outlined" onClick={createFlashCard()}>Create new Flash Card</Button>
                    </Box>
                </Grid>
                <Grid xs={12}>
                    
                </Grid>
            </Grid>
        </Container>
    );
}