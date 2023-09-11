import { responseFormatter } from '../../../lib/responseLib/responseFormatter';

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
