import { Box, Button, Card, Grid, IconButton, TextField } from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import styles from '../../styles/InAlbom.module.css';
import { IAlbum } from '../../types/album';
import TrackList from '../../components/TrackList';
import TrackItem from '../../components/TrackItem';
//import styles from '../../styles/AlbomList.module.css';
import { Add } from '@material-ui/icons';

const AlbumPage = ({serverAlbum}) => {
    const [album, setAlbum] = useState<IAlbum>(serverAlbum)
    const router = useRouter()  
    
    const trackId = useInput('')
    var showField = false
  
    return (
        <div className={styles.bg} style={{margin:"center"}}>
        <MainLayout title={"Music Platform - " + album.name + " - " + album.author }
        keywords={"Music, artist, " + album.name + ", " + album.author}
        >
            
            <Grid container style={{marginTop: '80px'}}>
                <img src={'http://localhost:5000/' + album.picture} width="400" height="400" />
                <div style={{marginLeft: 30}}>
                    <h1>Name of album: {album.name}</h1>
                    <h1>Author of album: {album.author}</h1>
                </div>
            </Grid>
         <Button className={styles.backbutton}
                variant={"outlined"}
                style={{fontSize: 32}} 
                onClick={() => router.push('/albums')}
            >
                Return to List
            </Button>
            <h1>
                Tracks of albums: 
            </h1>
            
            <Box className={styles.box}>
                <br/>
            <div>
                <Card>

                {album.tracks.map(track =>
                        <TrackItem 
                            key={track._id}
                            track={track}
                        />
                    )}
                <br/>
                 </Card> 
            </div>
            <br/>

            </Box>
            
        </MainLayout></div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const response = await axios.get('http://localhost:5000/albums/' + params.id)
    return {
        props: {
            serverAlbum: response.data
        }
    }
}

export default AlbumPage;