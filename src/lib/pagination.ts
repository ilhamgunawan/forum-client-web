export interface Pagination {
  countCurrentPage: number
  countTotal: number
  countTotalPages: number
  currentPage: number
  previousPage: number
  nextPage: number
}

export type GetPaginationRequest = {
  countCurrentPage: number
  countTotal: number
  currentPage: number
  limit: number
};

export function getPagination(request: GetPaginationRequest) {
  const result: Pagination = {
    countCurrentPage: request.countCurrentPage,
    countTotal: request.countTotal,
    countTotalPages: request.countTotal / request.countCurrentPage,
    currentPage: request.currentPage,
    previousPage: -1,
    nextPage: -1,
  };

  const modTotalPage = request.countTotal % request.limit;
  if (modTotalPage > 0) result.countTotalPages = Math.floor(result.countTotalPages) + 1;

  const atFirstPageAndUp = request.currentPage >= 1;
  const atSecondPageAndUp = request.currentPage > 1;
  const hasRemainingPage = result.countTotalPages - result.currentPage >= 1;

  if (atSecondPageAndUp) result.previousPage = result.currentPage - 1;
  if (atFirstPageAndUp && hasRemainingPage) result.nextPage = result.currentPage + 1;

  return result;
}
