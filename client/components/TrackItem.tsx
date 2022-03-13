import React from 'react';
import { ITrack } from '../types/track';
import {Card, IconButton, Grid} from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import {Pause, PlayArrow, Delete} from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import axios from 'axios';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;

}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()


    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
       
        axios.post('http://localhost:5000/tracks/listen/' + track._id)
        
    }

    return (

        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active
                ? <Pause/>
                : <PlayArrow/>}
            </IconButton>

            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 10, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:40 / 03:20</div>}
            <div style={{marginLeft: 'auto'}}>
             Listens: {track.listens}   
            </div>

        </Card>

    );
};

export default TrackItem;