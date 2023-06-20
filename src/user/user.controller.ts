import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ParseIntPipe} from "@nestjs/common";
import { createUserDTO } from "./dto/create-user.dto";
import { updatePutUserDTO } from "./dto/update-put-user.dto";
import { updatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body: createUserDTO){
        return {body}
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number){
        return {user:{}, Param}
    }


    @Put(':id')
    async update(@Body() Body: updatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return {
            method: 'put',
            Body,
            id
        }
    }


    @Patch(':id')
    async updateParcial(@Body() Body: updatePatchUserDTO,@Param('id', ParseIntPipe) id: number){
        return {
            method: 'patch',
            Body,
            id
        }
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return { Method: 'Delete', id}
    }






}