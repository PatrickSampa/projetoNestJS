import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ParseIntPipe, UseInterceptors} from "@nestjs/common";
import { createUserDTO } from "./dto/create-user.dto";
import { updatePutUserDTO } from "./dto/update-put-user.dto";
import { updatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserServices } from "./user.services";
import { logInterceptors } from "src/interceptors/log.interceptors";

@UseInterceptors(logInterceptors)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserServices){}

    @Post()
    async create(@Body() body: createUserDTO){
        return this.userService.create(body);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.show(id);
    }


    @Put(':id')
    async update(@Body() Body: updatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(id,Body)
    }


    @Patch(':id')
    async updateParcial(@Body() Body: updatePatchUserDTO,@Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(id,Body)
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id)
    }






}