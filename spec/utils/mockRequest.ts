type IHeaders = {
  authorization: String;
};
interface IMockRequest<T> {
  body?: Partial<T>;
  headers?: IHeaders;
  query?: any;
  params?: any;
}

const mockRequest = <T>({ body, headers, query, params }: IMockRequest<T>) => {
  return {
    body,
    headers,
    query,
    params,
  };
};

export { mockRequest };
