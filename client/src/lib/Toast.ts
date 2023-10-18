import { MutableRefObject } from "react";

export class ToastService {
  toastRef: MutableRefObject<null>;

  constructor(toastRef: MutableRefObject<null>) {
    this.toastRef = toastRef;
  }

  showSuccess = (summary: string, message: string) => {
    this.toastRef.current.show({
      severity: "success",
      summary: summary,
      detail: message,
      life: 3000,
    });
  };

  showInfo = (summary: string, message: string) => {
    this.toastRef.current.show({
      severity: "info",
      summary: summary,
      detail: message,
      life: 3000,
    });
  };

  showWarn = (summary: string, message: string) => {
    this.toastRef.current.show({
      severity: "warn",
      summary: summary,
      detail: message,
      life: 3000,
    });
  };

  showError = (summary: string, message: string) => {
    this.toastRef.current.show({
      severity: "error",
      summary: summary,
      detail: message,
      life: 3000,
    });
  };
}
