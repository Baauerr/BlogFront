import { PostInfoDTO } from "../DTO/postDTO/postDTO.js";
import { ErrorsDTO } from "../DTO/errorDTO/errorDTO.js";
import { validateDynamicParam } from "../routing/routing.js";

export function validateNewPostInfo(postInfo: PostInfoDTO, errorsDTO: ErrorsDTO): ErrorsDTO{

    if (postInfo.title === undefined || postInfo.title.length < 5) {
        errorsDTO.errors.push({ id: "title", message: "Название не может быть такой длины" })
    }
    if (postInfo.description === undefined  || postInfo.description.length < 5){
        errorsDTO.errors.push({ id: "description", message: "Текст поста не может быть такой длины" })
    }
    if (postInfo.tags === undefined){
        errorsDTO.errors.push({ id: "tags", message: "У поста должны быть тэги" })
    }

    if (postInfo.image !== undefined) {
        const imageError = validateImageUrl(postInfo.image);
        if (!imageError) {
            errorsDTO.errors.push({ id: "image", message: "Некорректная ссылка на картинку" });
        }
    }

    if (postInfo.addressId !== undefined){
        const addressId = validateDynamicParam(postInfo.addressId, "id");
        if (!addressId) {
            errorsDTO.errors.push({ id: "address-input", message: "Некорректный id адреса" });
        }
    }
    return errorsDTO;
}


function validateImageUrl(postImage: string): boolean{
    const pattern = /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

    const isValid = pattern.test(postImage);
    console.log(isValid);
    console.log(postImage);

    return isValid;
}

