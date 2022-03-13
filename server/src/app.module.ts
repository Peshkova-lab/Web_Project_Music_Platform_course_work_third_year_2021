import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path';
import { AlbumModule } from "./album/album.module";



@Module({
    imports: [
        ServeStaticModule.forRoot( {rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.y40mu.mongodb.net/music_platform?retryWrites=true&w=majority'),
        TrackModule,
        AlbumModule,
        FileModule
    ]
})
export class AppModule {

}