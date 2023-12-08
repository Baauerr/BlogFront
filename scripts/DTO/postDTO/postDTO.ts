
import { PagintationDTO } from "../communityDTO/communityDTO.js";
import { TagDTO } from "../tagDTO/tagDTO.js";
import { CommentDTO } from "../comment/commentDTO.js";

export class PostsDTO{
    posts: PostDTO[];
    pagination: PagintationDTO;
}

export class PostInfoDTO {
    readingTime?: number = 0;
    title: string;
    tags: string[];
    description: string;
    addressId?: string | null = null;
    image?: string | null = null;

    constructor(title: string, tags: string[], description: string) {
        this.title = title;
        this.tags = tags;
        this.description = description;
    }
}

export class ConcretePostDTO{
    id: string;
    createTime: string;
    title: string;
    description: string;
    readingTime: 0;
    image: string;
    authorId: string;
    author: string;
    communityId: string;
    communityName: string;
    addressId: string;
    likes: number;
    hasLike: boolean;
    commentsCount: number;
    tags: TagDTO[];
    comments: CommentDTO[];
}

export class PostDTO{
    id: string;
    createTime: string;
    title: string;
    description: string;
    readingTime: 0;
    image: string;
    authorId: string;
    author: string;
    communityId: string;
    communityName: string;
    addressId: string;
    likes: number;
    hasLike: boolean;
    commentsCount: number;
    tags: TagDTO[];
}