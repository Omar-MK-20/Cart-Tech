export interface GetAllResponseI<T> {
    result: number;
    metadata: {
        currentPage: number,
        numberOfPages: number,
        limit: number,
        nextPage?: number
    };
    data: T[]
};

export interface GetSingleResponseI<T> {
    data: T
}