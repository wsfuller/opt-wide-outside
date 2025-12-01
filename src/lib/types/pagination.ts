export default interface PaginatedResult<T> {
  data: T[];
  total: number;
}
