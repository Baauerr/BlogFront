export class CommentDTO {
    id;
    createTime;
    content;
    modifiedDate;
    deleteDate;
    authorId;
    author;
    subComments;
}
export class SendCommentDTO {
    content;
    parentId;
    constructor(content, parentId) {
        this.content = content;
        this.parentId = parentId || null;
    }
}
export class CommentEditDataDTO {
    content;
}
//# sourceMappingURL=commentDTO.js.map