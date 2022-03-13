import React from 'react';
import { ITrack } from '../types/track';
import {Grid, Box} from "@material-ui/core";
import TrackItem from './TrackItem';
import styles from "../styles/TrackList.module.css";


interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    
    return (
        <Grid container direction="column" className={styles.bg}>
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem 
                        key={track._id}
                        track={track}
                    />)}
            </Box>

        </Grid>
    );
};

export default TrackList;