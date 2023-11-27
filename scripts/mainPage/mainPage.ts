import { getInfoOnPage } from "../api/mainPageAPI.js";

export class mainPageData{
    tags: string[] | null;
    author: string | null;
    min: number | null;
    max: number | null;
    sorting: string | null;
    onlyMyCommunites: boolean | null;
    page: number;
    size: number;
}

const data: mainPageData = {
    tags: null,
    author: null,
    min: null,
    max: null,
    sorting: "LikeAsc",
    onlyMyCommunites: false,
    page: 1,
    size: 5,
}

getInfoOnPage(data);