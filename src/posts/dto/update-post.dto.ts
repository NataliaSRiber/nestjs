import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto'; // pega as infos do create

export class UpdatePostDto extends PartialType(CreatePostDto) {}
