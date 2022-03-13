import Navbar from "../../components/Navbar";
import MainLayout from "../../layouts/MainLayout";
import { Grid, Card, Button, Box, TextField } from '@material-ui/core';
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import {Store} from 'redux'
import React, { useState } from "react";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { useDispatch } from "react-redux";
import axios from "axios";
import AlbumList from "../../components/AlbumList";

import styles from '../../styles/AlbomList.module.css';
import { fetchAlbums, searchAlbums } from "../../store/actions-creators/album";

const Index = () => {
    const router = useRouter()
    const {albums, error} = useTypedSelector(state => state.album)
    const [query, setQuery] = useState<string>('')

    const dispatch = useDispatch() as NextThunkDispatch;

    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async ()=> {
                await dispatch(await searchAlbums(e.target.value))
            }, 500)
        )
    }
    
    return (
        <div className={styles.bg} style={{margin:"center"}}>
        <MainLayout title={"List of Albums - Music Platform"}>
       
            <Grid container   className={styles.headerr1}>
                <Box p={3}>
                <Card style={{width: 1100}} className={styles.headerr}>
                    <Grid  justifyContent='space-between' >
                        <h1>List of albums</h1>
                        <Button onClick={() => router.push('/albums/create')} className={styles.button}>Load album</Button>
                    </Grid><br/>
                </Card><br/>
                <TextField
                fullWidth
                value={query}
                onChange={search}>
                    
                </TextField><br/>
                <AlbumList albums={albums}/>
                </Box>
            </Grid>
        </MainLayout></div>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps ((store) => async (context) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbums())
    
    //return {props: {getServerSideProp: {}}}
    return null;
})
