import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

var alertify : any = require('../assets/alertify.js');
export class AlertService {

  constructor() { }


logError(msg) {
    console.error(msg);
}

logMessage(msg) {
    console.log(msg);
}

logTrace(msg) {
    console.trace(msg);
}

logWarning(msg) {
    console.warn(msg);
}

  showMessage(message: string, severity: MessageSeverity, isSticky: Boolean){
    if (!severity)
      severity = MessageSeverity.default;

    this.showMessageHelper(message,severity,isSticky);
  }

  showStickyMessage(message: string, severity: MessageSeverity, isSticky: Boolean){
    if (!severity)
      severity = MessageSeverity.default;

    this.showMessageHelper(message,severity,isSticky);
  }
  showMessageHelper(message: string, severity: MessageSeverity, isSticky: Boolean){
    switch (severity) {
      case MessageSeverity.default:
      alertify.success(message); 
          break;
      case MessageSeverity.success:
      alertify.success(message); 
          break;
      case MessageSeverity.error:
      alertify.error(message); 
          break;
   }
  }

}

export enum MessageSeverity {
  default,
  success,
  error
}