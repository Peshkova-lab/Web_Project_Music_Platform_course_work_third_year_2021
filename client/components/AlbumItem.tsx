import React from 'react';
import { ITrack } from '../types/track';
import {Card, IconButton, Grid, Modal} from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import {Pause, PlayArrow, Delete, Add} from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import { IAlbum } from '../types/album';

interface AlbumItemProps {
    album: IAlbum;
}

const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {
    const router = useRouter()

    return (

        <Card className={styles.track} onClick={() => router.push('/albums/' + album._id)}>

            <img width={70} height={70} src={'http://localhost:5000/' + album.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{album.name}</div>
                <div style={{fontSize: 10, color: 'gray'}}>{album.author}</div>
            </Grid>

            
        </Card>

    );
};

export default AlbumItem;