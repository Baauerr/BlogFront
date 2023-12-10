import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";
export async function getAddressChainAPI(addressGuid) {
    const url = `https://blog.kreosoft.space/api/address/chain?objectGuid=${addressGuid}`;
    return makeRequestAPI(url, Request.GET);
}
//# sourceMappingURL=addressAPI.js.map