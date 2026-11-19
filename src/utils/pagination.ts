interface IPagination<T> {
  data: T[];
  meta: {
    total: number;
    currentPage: number;
    totalPage: number;
    next: number | null;
    back: number | null;
  };
}

export interface QueryOptions {
  filter?: any;
  sort?: any;
  select?: any;
  populate?: any;
}

export const Pagination = async <T>(
  model: any,
  page: number = 1,
  limit: number = 10,
  queryOptions: QueryOptions = {},
): Promise<IPagination<T>> => {
  const { filter = {}, sort = {}, select = {}, populate = '' } = queryOptions;
  const total = await model.countDocuments(filter);
  const totalPage = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  let dbQuery = model
    .find(filter)
    .populate(populate)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(select);
  const data = await dbQuery;
  const next = page < totalPage ? page + 1 : null;
  const back = page > 1 ? page - 1 : null;

  return {
    data,
    meta: { total, totalPage, currentPage: page, next, back },
  };
};
