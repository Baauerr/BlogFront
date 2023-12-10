import { AddressChainDTO } from "../DTO/address/addressDTO.js";
import { makeRequestAPI } from "./mainFetcherAPI.js";
import { Request } from "./mainFetcherAPI.js";

export async function getAddressChainAPI(addressGuid: string): Promise<AddressChainDTO[]> {
  const url = `https://blog.kreosoft.space/api/address/chain?objectGuid=${addressGuid}`;
  return makeRequestAPI(url, Request.GET);
}