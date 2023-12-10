import { FilterDTO } from "../DTO/filterDTO/filterDTO.js";

export function filtersToUrl(filterData: FilterDTO) {
    return Object.entries(filterData)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.filter(tag => tag !== "null").length > 0;
        } else if (typeof value === 'number') {
          return value >= 0;
        } else {
          return value !== null && value !== "";
        }
      })
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          const filteredTags = value.filter(tag => tag !== null);
          if (filteredTags.length > 0) {
            return filteredTags.map(tag => `${encodeURIComponent(key)}=${encodeURIComponent(tag)}`);
          } else {
            return [];
          }
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');
  }