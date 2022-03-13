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
import styles from '../../styles/TrackList.module.css';
import axios from "axios";

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
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
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }
    
    return (
        <div className={styles.bg}>
        <MainLayout title={"List of Tracks - Music Platform"}>
            <Grid container justifyContent='right' >
                <Box p={3}>
                <Card style={{width: 1100}} className={styles.headerr}>
                    <Grid  justifyContent='space-between' >
                        <h1 >List of tracks</h1>
                       
                    </Grid> 
                    <Button onClick={() => router.push('/tracks/create')} className={styles.button}>Load track</Button>
                </Card><br/>
                <TextField
                fullWidth
                value={query}
                onChange={search}>
                </TextField><br/>
                <br/>

                
                <TrackList tracks={tracks}/>
                </Box>
            </Grid>
        </MainLayout>
        </div>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps ((store) => async (context) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
    
    //return {props: {getServerSideProp: {}}}
    return null;
})
