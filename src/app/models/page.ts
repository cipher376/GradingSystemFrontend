
export interface PageInfo {
  offset: number;
  pageSize?: number;
  limit: number;
  count?: number;
}

export class PagedData<T> {
  data = new Array<T>();
  page = new Page();
}

export class Page {
  // The maximum number of elements this page can contain
  size: number = 0;
  // The total number of elements in this page
  totalElements: number = 0;
  // The total number of pages this page is part of
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}



/**
 * Package data into a PagedData object based on the selected Page
 * @param page The page data used to get the selected data from companyData
 * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
 */
export function getPagedData<T>(page: Page, data: T[]): PagedData<T> {
  const pagedData = new PagedData<T>();
  if (data.length < 1) {
    return pagedData;
  }

  page.totalElements += data.length;
  page.totalPages = page.totalElements / page.size;
  console.log('size: ' + page.size);
  console.log('count: ' + page.totalElements);
  console.log('total pages:' + page.totalPages);
  pagedData.data = data;
  pagedData.page = page;
  return pagedData;
}
