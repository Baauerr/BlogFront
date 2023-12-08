import { ProfileInfoDTO } from "../users/userDTO.js";
import { TagDTO } from "../tagDTO/tagDTO.js";
import { PostDTO } from "../postDTO/postDTO.js";

export class CommunityDTO{
    id: string;
    createTime: string;
    name: string;
    description: string;
    isClosed: boolean;
    subscribersCount: number
}

export class UsersCommunityDTO{
    userId: string;
    communityId: string;
    role: UserRoles;
}

export class ConcreteCommunityDTO{
    id: string;
    createTime: string;
    name: string;
    description: string;
    isClosed: boolean;
    subscribersCount: number;
    administrators : ProfileInfoDTO[];
}


export class PagintationDTO{
    size:  number;
    count: number;
    current: number;
}



export enum UserRoles {
    Administrator = "Administrator",
    Subscriber = "Subscriber",
    NoRole = null
}