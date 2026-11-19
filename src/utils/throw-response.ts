export class ThrowResponse<T> {
  message: string;
  statusCode: number;
  data: T | null;
  success: boolean;

  constructor(
    statusCode: number,
    data: T | null,
    message = 'Successfully done',
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
