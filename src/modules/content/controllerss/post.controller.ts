import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Depends } from '@/modules/restful/decorators';
import { DeleteWithTrashDto, RestoreDto } from '@/modules/restful/dtos';

import { Guest, ReqUser } from '@/modules/user/decorators';

import { UserEntity } from '@/modules/user/entities';

import { ContentModule } from '../content.module';
import { CreatePostDto, QueryPostDto, UpdatePostDto } from '../dtos';
import { PostService } from '../services/post.service';

@ApiTags('文章操作')
@Depends(ContentModule)
@Controller('posts')
export class PostController {
    constructor(protected service: PostService) {}

    /**
     * 查询文章列表
     * @param options
     */
    @Get()
    @Guest()
    @SerializeOptions({ groups: ['post-list'] })
    async list(
        @Query()
        options: QueryPostDto,
    ) {
        return this.service.paginate(options);
    }

    /**
     * 查询文章详情
     * @param id
     */
    @Get(':id')
    @Guest()
    @SerializeOptions({ groups: ['post-detail'] })
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.service.detail(id);
    }

    /**
     * 新增文章
     * @param data
     */
    @Post()
    @ApiBearerAuth()
    @SerializeOptions({ groups: ['post-detail'] })
    async store(
        @Body()
        data: CreatePostDto,
        @ReqUser() author: ClassToPlain<UserEntity>,
    ) {
        return this.service.create(data, author);
    }

    /**
     * 更新文章
     * @param data
     */
    @Patch()
    @ApiBearerAuth()
    @SerializeOptions({ groups: ['post-detail'] })
    async update(
        @Body()
        data: UpdatePostDto,
    ) {
        return this.service.update(data);
    }

    /**
     * 删除文章
     * @param data
     */
    @Delete()
    @ApiBearerAuth()
    @SerializeOptions({ groups: ['post-list'] })
    async delete(
        @Body()
        data: DeleteWithTrashDto,
    ) {
        const { ids, trash } = data;
        return this.service.delete(ids, trash);
    }

    /**
     * 恢复软删除文章
     * @param data
     */
    @Patch('restore')
    @ApiBearerAuth()
    @SerializeOptions({ groups: ['post-list'] })
    async restore(
        @Body()
        data: RestoreDto,
    ) {
        const { ids } = data;
        return this.service.restore(ids);
    }
}
