import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Card, Button, TextField } from '@material-ui/core';
import StepWrapper_2 from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/CreatePage.module.css';

const Create = () => {
    
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
   
    const name = useInput('')
    const author = useInput('')

    const router = useRouter()


    const next = () => {
        if (activeStep !== 1) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('author', author.value)
            formData.append('picture', picture)

            axios.post('http://localhost:5000/albums', formData)
                .then(resp => router.push('/albums'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {

        setActiveStep(prev => prev - 1)
    }

    return (
        <div className={styles.bg}>
        <MainLayout>
            <StepWrapper_2 activeStep={activeStep}>
                {activeStep === 0 &&
                <Grid  container direction={"column"} style={{padding: 20}}  className={styles.bgg} >
                    <h1>Step 1. Information about album</h1>
                    <TextField
                        {...name}
                        style={{marginTop: 10}}
                        label={"Name of track"}
                    />
                    <TextField
                        {...author}
                        style={{marginTop: 10}}
                        label={"Artist of track"}
                    />
                </Grid>
                }
                {activeStep === 1 &&
                <Grid className={styles.bgg}>
                <h1>Step 2. Upload cover</h1>
                <FileUpload setFile={setPicture} accept="image/*">
                    <Button> className={styles.button}Upload cover</Button>
                </FileUpload> 
                </Grid>    
                }
            </StepWrapper_2>
            <Grid container justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={back}  className={styles.button}>Back</Button>
                <Button onClick={next} className={styles.button}>Next</Button>
            </Grid>

        </MainLayout>    </div>
    )
}

export default Create;