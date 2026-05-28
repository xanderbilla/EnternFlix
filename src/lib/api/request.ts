/**
 * Percent-encode a path segment so IDs containing `/`, `?`, `#`, spaces, etc.
 * cannot break out of the URL path or inject query parameters.
 */
const encPath = (value: string | number): string =>
  encodeURIComponent(String(value));

/**
 * Percent-encode a value placed in a query string, using the
 * `application/x-www-form-urlencoded` convention (spaces → `+`).
 */
const encQuery = (value: string | number): string =>
  encodeURIComponent(String(value)).replace(/%20/g, "+");

const requests = {
  // Custom backend — relative paths resolved against customAxios.baseURL
  fetchAllContent: (type: string = "all") => `c/content?type=${encQuery(type)}`,
  fetchMovieById: (id: string) => `c/content/${encPath(id)}`,
  fetchPersonById: (id: string) => `c/people/${encPath(id)}`,
  fetchPersonMovies: (id: string, type: string = "all") =>
    `c/people/${encPath(id)}/content?type=${encQuery(type)}`,
  fetchDiscoverByAttribute: (attributeId: string, content: string = "all") =>
    `c/attributes/${encPath(attributeId)}?content=${encQuery(content)}`,
  fetchAttributes: (type: string = "genres") =>
    `c/attributes?type=${encQuery(type)}`,
  fetchDiscover: (type: string = "latest", content: string = "all") =>
    `c/discover?type=${encQuery(type)}&content=${encQuery(content)}`,
  fetchDiscoverPaginated: (
    type: string = "latest",
    content: string = "all",
    options?: { limit?: number; cursor?: string; sort?: string },
  ) => {
    const params = [`type=${encQuery(type)}`, `content=${encQuery(content)}`];
    if (options?.limit !== undefined) params.push(`limit=${options.limit}`);
    if (options?.sort) params.push(`sort=${encQuery(options.sort)}`);
    if (options?.cursor) params.push(`cursor=${encQuery(options.cursor)}`);
    return `c/discover?${params.join("&")}`;
  },
  fetchDiscoverByAttributePaginated: (
    attributeId: string,
    content: string = "all",
    options?: { limit?: number; cursor?: string; sort?: string },
  ) => {
    const params = [`content=${encQuery(content)}`];
    if (options?.limit !== undefined) params.push(`limit=${options.limit}`);
    if (options?.sort) params.push(`sort=${encQuery(options.sort)}`);
    if (options?.cursor) params.push(`cursor=${encQuery(options.cursor)}`);
    return `c/attributes/${encPath(attributeId)}?${params.join("&")}`;
  },
  fetchBanner: (type: string = "all") => `c/banner?type=${encQuery(type)}`,
  fetchSearch: (
    query: string,
    options?: {
      in?: "all" | "movie" | "tv" | "people";
      sort?: string;
      page?: number;
      pageSize?: number;
      contentPage?: number;
      contentPageSize?: number;
      peoplePage?: number;
      peoplePageSize?: number;
    },
  ) => {
    const params = [
      `query=${encQuery(query)}`,
      `in=${encQuery(options?.in ?? "all")}`,
      `sort=${encQuery(options?.sort ?? "recent")}`,
    ];

    if (options?.page !== undefined) params.push(`page=${options.page}`);
    if (options?.pageSize !== undefined)
      params.push(`pageSize=${options.pageSize}`);
    if (options?.contentPage !== undefined)
      params.push(`contentPage=${options.contentPage}`);
    if (options?.contentPageSize !== undefined)
      params.push(`contentPageSize=${options.contentPageSize}`);
    if (options?.peoplePage !== undefined)
      params.push(`peoplePage=${options.peoplePage}`);
    if (options?.peoplePageSize !== undefined)
      params.push(`peoplePageSize=${options.peoplePageSize}`);

    return `c/search?${params.join("&")}`;
  },
  fetchPlayback: (contentType: string, contentId: string) =>
    `c/play/${encPath(contentType.toLowerCase())}/${encPath(contentId)}`,
};

export default requests;
