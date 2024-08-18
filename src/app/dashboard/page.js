'use client';
import { Timestamp } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { Container, Grid, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function DashBoard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]); // Track flipped indices
    const [dialogOpen, setDialogOpen] = useState(false);
    const [topic, setTopic] = useState(''); // State variable for topic

    const handleSubmit = async () => {
      console.log(user.id)
        if (!topic.trim()) {
            alert('Please enter a topic.');
            return;
        }
    
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const generatedFlashcards = await response.json();
            setFlashcards(generatedFlashcards.flashcards);
            console.log(generatedFlashcards);
            // Store each flashcard in Firestore
            const flashcardsCollection = collection(db, 'flashcards');
            for (const flashcard of generatedFlashcards.flashcards) {
                await addDoc(flashcardsCollection, {
                    front: flashcard.front,
                    back: flashcard.back,
                    userId: user.id,// Assuming you have access to user ID from Clerk
                    date: flashcard.date
                });
            }
        } catch (error) {
          console.error('Error generating flashcards:', error);
        }
    };

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const toggleFlip = (index) => {
        setFlippedIndices((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index); // Remove index if already flipped
            } else {
                return [...prev, index]; // Add index to flipped
            }
        });
    };

    const handleOpenCollections = async () => {
        if (!isSignedIn) return; // Ensure the user is signed in
    
        try {
            const flashcardsCollection = collection(db, 'flashcards');
            const q = query(flashcardsCollection, where("userId", "==", user.id)); // Filter by user ID
            const querySnapshot = await getDocs(q);
    
            const userFlashcards = [];
            querySnapshot.forEach((doc) => {
                userFlashcards.push({ id: doc.id, ...doc.data() }); // Push flashcard data to the array
            });
    
            setFlashcards(userFlashcards); // Update your state with the user's flashcards
            console.log(userFlashcards);
        } catch (error) {
            console.error('Error retrieving flashcards:', error);
        }
    };
    const handleDeleteFlashcard = async (id) => {
        try {
            const flashcardDoc = doc(db, 'flashcards', id);
            await deleteDoc(flashcardDoc);
            setFlashcards(flashcards.filter(f => f.id !== id)); // Remove the deleted flashcard from the state
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };
    

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        sx={{ my: '20px' }}
                        justifyContent={'center'}
                        gap={'5px'}
                        padding={'20px'}>
                        <Button variant="outlined" onClick={handleOpenCollections}>Collections</Button>
                        <Button variant="outlined" onClick={handleOpenDialog}>Generate Flashcards</Button>
                    </Box>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    {/* Display generated flashcards here */}
                    {flashcards.map((fc, index) => (
                        <Grid item key={index}>
                            <Box
                                onClick={() => toggleFlip(index)} // Flip on click
                                sx={{
                                    width: '200px', // Set width to 150px
                                    height: '250px', // Set height to 200px
                                    border: '1px solid gray',
                                    margin: '10px',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between', // Ensure content is spaced out
                                    alignItems: 'center',
                                    backgroundColor: flippedIndices.includes(index) ? '#d3f8d3' : '#f8d3d3' // Change background color based on flipped state
                                }}>
                                <p style={{ textAlign: 'center' }}>
                                    <strong>{flippedIndices.includes(index) ? 'Back:' : 'Front:'}</strong><br />
                                    {flippedIndices.includes(index) ? fc.back : fc.front}
                                </p>
                                <p style={{ textAlign: 'center' }}>
                                  Created on: {fc.date}
                                </p>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDeleteFlashcard(fc.id)}
                                >
                                    Delete
                                </Button>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Dialog for generating flashcards */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Generate Flashcards</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Enter Topic"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTopic(e.target.value)} // Set the topic state
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={() => { handleSubmit(); handleCloseDialog(); }}>Generate</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
