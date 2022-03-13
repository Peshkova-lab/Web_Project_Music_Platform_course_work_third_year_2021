import axios from "axios"
import router from "next/router"
import { Dispatch } from "react"
import { AlbumAction, AlbumActionTypes } from "../../types/album"
import { ITrack, TrackAction, TrackActionTypes } from "../../types/track"
import { trackReducer } from "../reducers/trackReducer"

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/albums')
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'It is ERROR with load of albums'
            })
        }
    }
}

export const addTrackToAlbum = (id_A: string, id_T: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.post('http://localhost:5000/albums/search/' + id_A + "/" + id_T)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'It is ERROR with add track to albums'
            })
        }
    }
}

export const searchAlbums = (query: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/albums/search?query=' + query)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'It is ERROR with search of albums'
            })
        }
    }
}