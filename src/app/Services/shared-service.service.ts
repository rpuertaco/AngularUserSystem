import { Injectable } from '@angular/core';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: number;
  timestamp: string;
  path: string;
  method: string;
  name: string;
  status: number;
  statusText: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() { }

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.textContent = 'Form submitted successfully.';
        await this.wait(1000);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        if (error?.messageDetail) {
          toastMsg.textContent =
            'Error on form submitted, show logs. Message: ' +
            error?.message +
            '. Message detail: ' +
            error?.messageDetail +
            '. Status code: ' +
            error?.statusCode;
        } else {
          if (error?.status === 401) {
            toastMsg.textContent = "Incorrect Username or Password";
          } else if (error?.message) {

            toastMsg.textContent = error.message;

          }
          else if (error?.name || error?.status) {

            toastMsg.textContent =
              'Something went wrong:  ' +
              error?.name +
              '. Error: ' +
              error?.status + " " + error?.statusText;
          } else if (error?.code === 11000) {


            toastMsg.textContent = "Email already in use";

          } else {
            toastMsg.textContent = "Something went wrong";
          }

        }

        await this.wait(1000);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error('path:', error.path);
    console.error('timestamp:', error.timestamp);
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
