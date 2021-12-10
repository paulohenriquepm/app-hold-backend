type IHeaders = {
  authorization: String;
};
interface IMockRequest<T> {
  body?: Partial<T>;
  headers?: IHeaders;
  query?: any;
}

const mockRequest = <T>({ body, headers, query }: IMockRequest<T>) => {
  return {
    body,
    headers,
    query,
  };
};

export { mockRequest };
