import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Track, TrackDocument } from "src/track/schemas/track.schema";
import { Album, AlbumDocument } from "./album.schema";
import {FileService, FileType} from '../file/file.service';
import { CreateAlbumDto } from "./create-album.dto";


@Injectable()
export class AlbumService {
    
    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>, 
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        const album = await this.albumModel.create({...dto, picture: picturePath});
        return album;
    }

    async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(Number(offset)).limit(Number(count));
    return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await (await this.albumModel.findById(id)).populate('tracks');
        return album;
    }

    async search (query: string): Promise<Album[]> {
        const albums = await this.albumModel.find( {
            name: {$regex: new RegExp(query, 'i')}
        })
        return albums;
    }

    async addTrackIn(id_A: ObjectId, id_T: ObjectId): Promise<Track> {
        
        const album = await this.albumModel.findById(id_A);
        const track  = await this.trackModel.findById(id_T);
        
        album.tracks.push(track._id)
        await album.save();
        return track;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id);
        return album._id;
    }

}