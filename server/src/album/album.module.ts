import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { Track, TrackSchema } from "src/track/schemas/track.schema";
import { TrackModule } from "src/track/track.module";
import { AlbumController } from "./album.controller";
import { Album, AlbumSchema } from "./album.schema";
import { AlbumService } from "./album.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService]
})
export class AlbumModule {}