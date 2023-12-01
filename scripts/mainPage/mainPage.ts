export class MainPageData {
    tags: string[] | null;
    author: string | null;
    min: number | null;
    max: number | null;
    sorting: string | null;
    onlyMyCommunities: boolean | null;
    page: number;
    size: number;

    constructor() {
        this.tags = null;
        this.author = null;
        this.min = null;
        this.max = null;
        this.sorting = null;
        this.onlyMyCommunities = null;
        this.page = 1;
        this.size = 5;
    }
}




