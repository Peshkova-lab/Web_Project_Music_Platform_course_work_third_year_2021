import React from 'react';
import {Grid, Box} from "@material-ui/core";
import { IAlbum } from '../types/album';
import AlbumItem from './AlbumItem';


interface AlbumListProps {
    albums: IAlbum[]
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {
    
    return (
        <Grid container direction="column">
            <Box p={2}>
                {albums.map(album =>
                    <AlbumItem 
                        key={album._id}
                        album={album}
                    />)}
            </Box>

        </Grid>
    );
};

export default AlbumList;