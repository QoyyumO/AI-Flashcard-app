
import { Button,Box, Typography, AppBar, Toolbar } from "@mui/material";
/* import { ClerkProvider, SignedOut, SignedIn, UserButton  } from "@clerk/nextjs"; */



export default function Navbar() {


    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                Flashcard SaaS
                </Typography> 
                {/* <ClerkProvider>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color="inherit" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </ClerkProvider> */}
                
            </Toolbar>
        </AppBar>
    )
   
}