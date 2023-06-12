export class ResponseDto<T> {
  data: T;
  errorMessage: string;

  constructor(data: T, errorMessage = '') {
    this.data = data;
    this.errorMessage = errorMessage;
  }
}
