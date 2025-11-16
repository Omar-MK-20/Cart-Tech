export interface GetAllResponseI<T>
{
  result: number;
  metadata: {
    currentPage: number,
    numberOfPages: number,
    limit: number,
    nextPage?: number;
  };
  data: T[];
};

export interface GetSingleResponseI<T>
{
  data: T;
}


export interface SignInResponse
{
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}


export interface AuthError
{
  statusMsg: string;
  message: string;
}


