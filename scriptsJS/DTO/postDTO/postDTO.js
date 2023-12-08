export class PostsDTO {
    posts;
    pagination;
}
export class PostInfoDTO {
    readingTime = 0;
    title;
    tags;
    description;
    addressId = null;
    image = null;
    constructor(title, tags, description) {
        this.title = title;
        this.tags = tags;
        this.description = description;
    }
}
export class ConcretePostDTO {
    id;
    createTime;
    title;
    description;
    readingTime;
    image;
    authorId;
    author;
    communityId;
    communityName;
    addressId;
    likes;
    hasLike;
    commentsCount;
    tags;
    comments;
}
export class PostDTO {
    id;
    createTime;
    title;
    description;
    readingTime;
    image;
    authorId;
    author;
    communityId;
    communityName;
    addressId;
    likes;
    hasLike;
    commentsCount;
    tags;
}
//# sourceMappingURL=postDTO.js.map