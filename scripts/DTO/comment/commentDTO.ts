export class CommentDTO{
    id: string;
    createTime: string;
    content: string;
    modifiedDate: string;
    deleteDate: string;
    authorId: string;
    author: string;
    subComments: number;
}

export class SendCommentDTO {
    content: string
    parentId?: string;

    constructor(content: string, parentId?: string) {
        this.content = content;
        this.parentId = parentId || null;
    }
}

export class CommentEditDataDTO {
    content: string;
}