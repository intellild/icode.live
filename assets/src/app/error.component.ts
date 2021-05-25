import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

export enum ErrorCode {
  ChannelUserReject = 'channel_user_reject',
  ChannelNotFound = 'channel_not_found',
  Unknown = 'unknown',
}

export interface IChannelError {
  type: ErrorCode.ChannelNotFound | ErrorCode.ChannelUserReject;
  channel: string;
}

export interface IUnknownError {
  type: ErrorCode.Unknown;
  params: Params;
}

enum ErrorAction {
  Redirect = 'redirect',
}

interface IRedirectAction {
  type: ErrorAction.Redirect;
}

export type IError = IChannelError | IUnknownError;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  error: IError;

  get ErrorCode() {
    return ErrorCode;
  }

  get message() {
    const error = this.error;
    switch (error.type) {
      case ErrorCode.ChannelNotFound:
        return `Channel ${error.channel} not found`;
      case ErrorCode.ChannelUserReject:
        return `You are rejected by user to join channel: ${error.channel}`;
      case ErrorCode.Unknown:
        return `Unknown error ${this.route.snapshot.toString()}`;
    }
  }

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    this.error = this.decodeError();
  }

  errorAction() {
    switch (this.error.type) {
      case ErrorCode.ChannelNotFound:
      case ErrorCode.ChannelUserReject:
        this.router.navigate(['channel', this.error.channel]);
        break;
      default:
        break;
    }
  }

  private decodeError(): IError {
    const error = this.route.snapshot.queryParams as IError;
    switch (error.type) {
      case ErrorCode.ChannelNotFound:
      case ErrorCode.ChannelUserReject:
        if (typeof error.channel === 'string') {
          return error;
        }
        return {
          type: ErrorCode.Unknown,
          params: error as Params,
        };
      default:
        return {
          type: ErrorCode.Unknown,
          params: error as Params,
        };
    }
  }
}
