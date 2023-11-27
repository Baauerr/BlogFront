import { getInfoOnPage } from "../api/mainPageAPI.js";
export class mainPageData {
    tags;
    author;
    min;
    max;
    sorting;
    onlyMyCommunites;
    page;
    size;
}
const data = {
    tags: null,
    author: null,
    min: null,
    max: null,
    sorting: "LikeAsc",
    onlyMyCommunites: false,
    page: 1,
    size: 5,
};
getInfoOnPage(data);
//# sourceMappingURL=mainPage.js.map