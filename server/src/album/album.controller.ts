import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./create-album.dto";


@Controller('/albums')
export class  AlbumController {
    constructor(private albumService: AlbumService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.albumService.create(dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
    @Query('offset') offset: number) {
       return this.albumService.getAll(count, offset);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query);
    }

    @Post('/:id_A/:id_T')
    addTrackIn(@Param('id_A') id_A: ObjectId, @Param('id_T') id_T: ObjectId) {
        return this.albumService.addTrackIn(id_A, id_T);
    }

    @Delete(':id') 
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }

}