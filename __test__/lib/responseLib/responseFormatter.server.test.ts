import {
  SuccessResponse,
  ErrorResponse,
  Response,
  responseFormatter,
} from '../../../lib/responseLib/responseFormatter'; // Replace 'your-module' with the actual module path

describe('responseFormatter', () => {
  it('should create a SuccessResponse when success is true', () => {
    const data = { message: 'Success' };
    const result = responseFormatter(true, data);

    expect(result).toEqual({
      success: true,
      data,
    });
  });

  it('should create an ErrorResponse when success is false', () => {
    const errorMessage = 'An error occurred';
    const result = responseFormatter(false, null, errorMessage);

    expect(result).toEqual({
      success: false,
      data: null,
      errorMessage,
    });
  });

  it('should create an ErrorResponse with an empty errorMessage when not provided', () => {
    const result = responseFormatter(false, null);

    expect(result).toEqual({
      success: false,
      data: null,
      errorMessage: '',
    });
  });
});

describe('Response interfaces', () => {
  it('should correctly type SuccessResponse', () => {
    const data: SuccessResponse<string> = {
      success: true,
      data: 'Success',
    };

    expect(data).toEqual({
      success: true,
      data: 'Success',
    });
  });

  it('should correctly type ErrorResponse', () => {
    const data: ErrorResponse = {
      success: false,
      data: null,
      errorMessage: 'An error occurred',
    };

    expect(data).toEqual({
      success: false,
      data: null,
      errorMessage: 'An error occurred',
    });
  });
});
