import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Card, Button, TextField } from '@material-ui/core';
import StepWrapper from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/CreatePage.module.css';

const Create = () => {
    
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()


    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('audio', audio)
            formData.append('picture', picture)

            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {

        setActiveStep(prev => prev - 1)
    }

    return (
        <div className={styles.bg}>
        <MainLayout >
            
            <StepWrapper activeStep={activeStep}  >
            
                {activeStep === 0 && 
                <Grid  container direction={"column"} className={styles.bgg} >
                    <h1>Step 1. Information about track</h1>
                    <TextField
                        {...name}
                        style={{marginTop: 10}}
                        label={"Name of track"}
                    />
                    <TextField
                        {...artist}
                        style={{marginTop: 10}}
                        label={"Artist of track"}
                    />
                    <TextField
                        {...text}
                        style={{marginTop: 10}}
                        label={"Text of track"}
                        multiline
                        rows={3}
                    />
                </Grid>
                } 
                {activeStep === 1 &&

                <Grid className={styles.bgg}>
                <h1>Step 2. Upload cover</h1>
                <FileUpload setFile={setPicture} accept="image/*">
                    <Button className={styles.button}>Upload cover</Button>
                </FileUpload> 
                </Grid>    
            }
                {activeStep === 2 &&
                 <Grid className={styles.bgg}>
                 <h1>Step 3. Upload track</h1>
                 <FileUpload setFile={setAudio} accept="audio/*">
                     <Button className={styles.button}>Upload track</Button>
                 </FileUpload> 
                 </Grid>  }
                
            </StepWrapper>
            
            <Grid container justifyContent="space-between" > 
                <Button disabled={activeStep === 0} onClick={back} >Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>

        </MainLayout>  
        </div>  
    )
}

export default Create;