'use client'

import { 
    Container, 
    Grid, 
    Button,
    Box, 
    getDialogContentTextUtilityClass} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";



export default function DashBoard() {

    const {isloaded, isSigned, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flippedFC, setFlippedFC] = useState([])
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            body: text,
        }).then((res) => res.json())
        .then(data > setFlashcards(data))

    }

    const handleClick = (id) => {
        setFlippedFC((prev) => ({
            ...prev,
            [id]: !prev[id],
          }))
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const saveFlashcards = async () => {
        if (!setName.trim()) {
          alert('Please enter a name for your flashcard set.')
          return
        }
      
        try {
          const userDocRef = doc(collection(db, 'users'), user.id)
          const userDocSnap = await getDoc(userDocRef)
      
          const batch = writeBatch(db)
      
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data()
            const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
            batch.update(userDocRef, { flashcardSets: updatedSets })
          } else {
            batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
          }
      
          const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
          batch.set(setDocRef, { flashcards })
      
          await batch.commit()
      
          alert('Flashcards saved successfully!')
          handleCloseDialog()
          setSetName('')
        } catch (error) {
          console.error('Error saving flashcards:', error)
          alert('An error occurred while saving flashcards. Please try again.')
        }
      }


 
    const showFlashCard = () => {

    }
    const createFlashCard = () => {}

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} >
                    <Box
                    display={'flex'}
                    flexDirection={'row'}
                    sx={{ my: '20px'}}
                    justifyContent={'center'}
                    gap={'5px'}
                    bgcolor={'gray'}
                    padding={'20px'}
                    >
                        <Button variant="outlined" sx={{mx:'2px'}}>Collections</Button>
                        <Button variant="outlined" onClick={createFlashCard()}>Create</Button>
                    </Box>
                </Grid>
                <Grid xs={12}>
                    
                </Grid>
            </Grid>
        </Container>
    );
}