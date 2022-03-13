import { Box, Button, Card, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import styles from '../../styles/TrackPage.module.scss';
import { margin, style } from '@material-ui/system';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()  
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.bg} style={{margin:"center"}}>
        <MainLayout title={"Music Platform - " + track.name + " - " + track.artist }
        keywords={"Music, artist, " + track.name + ", " + track.artist}
        >
            <div className={styles.context}>

            <Grid container >
                <img src={'http://localhost:5000/' + track.picture} width="450" height="450" style={{marginTop: '150px'}}/><br/>
            </Grid>
            <Button className={styles.button}
                variant={"outlined"}
                onClick={() => router.push('/tracks')}
            >
                Return to List
            </Button> 
            <Grid container className={styles.centerr}>
                <div style={{marginLeft: 0}}>
                    <h1>Name of track:    {track.name}</h1>
                    <h2>Artist of track:    {track.artist}</h2>
                    <h4>Count of listens:  {track.listens}</h4>
                </div><br/>

               
            </Grid> 
           


            <h1>Text of track</h1>
            <p>{track.text}</p>
            <h1>
                Comments
            </h1>
            <Grid container>
                <TextField
                    label="Username"
                    fullWidth   
                    {...username}
                />
                <TextField
                    label="Comment"
                    {...text}
                    fullWidth   
                    multiline
                    rows={4}
                />
                <Button onClick={addComment} className={styles.sendButton}>Send</Button>
            </Grid>
            <Box>
                <br/>
                <h2>Track comments: </h2>
            <div>
                <Card>
                <Grid container direction="column">
                    <Box p={2}>
                        {track.comments.map(comment =>
                            <Card className="styles.comment">
                   
                                <img src="http://localhost:5000/image/icon_human.png" width="70" height="70"/>
                        
                                <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                                    <div><h4>Author: {comment.username}</h4></div>    
                                    <div>Comment: {comment.text}</div>
                                </Grid>
                                <br/>
                            </Card>
                        )}
                  </Box>
                </Grid>
                <br/>
                 </Card> 
            </div>
            <br/>
                
            </Box>
            </div>
        </MainLayout>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}

export default TrackPage;