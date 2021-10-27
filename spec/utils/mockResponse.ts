import { Response } from 'express';

const mockResponse = () => {
  const response: Response = {} as Response;

  response.status = jest.fn().mockReturnValue(response);
  response.send = jest.fn().mockReturnValue(response);

  return response;
};

export { mockResponse };
