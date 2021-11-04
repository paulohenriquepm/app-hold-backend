type IHeaders = {
  authorization: String;
};
interface IMockRequest<T> {
  body?: Partial<T>;
  headers?: IHeaders;
}

const mockRequest = <T>({ body, headers }: IMockRequest<T>) => {
  return {
    body,
    headers,
  };
};

export { mockRequest };
