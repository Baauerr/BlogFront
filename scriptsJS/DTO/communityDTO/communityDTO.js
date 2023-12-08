export class CommunityDTO {
    id;
    createTime;
    name;
    description;
    isClosed;
    subscribersCount;
}
export class UsersCommunityDTO {
    userId;
    communityId;
    role;
}
export class ConcreteCommunityDTO {
    id;
    createTime;
    name;
    description;
    isClosed;
    subscribersCount;
    administrators;
}
export class PagintationDTO {
    size;
    count;
    current;
}
export var UserRoles;
(function (UserRoles) {
    UserRoles["Administrator"] = "Administrator";
    UserRoles["Subscriber"] = "Subscriber";
    UserRoles[UserRoles["NoRole"] = null] = "NoRole";
})(UserRoles || (UserRoles = {}));
//# sourceMappingURL=communityDTO.js.map