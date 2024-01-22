import { Emitter, EventType } from 'mitt';

export type CodeType = string;
export type SessionId = string;

export interface ConfirmationObject {
  type: CodeType | null;
}

export type Confirmation = boolean | ConfirmationObject;

export interface ISession {
  session_id: SessionId;
  confirmations: {
    [confirmation: string]: Confirmation;
  };
}

export interface ConfirmationState {
  name: string;
  id: string;
  isCompleted: boolean;
  emitter: Emitter<Record<EventType, unknown>>;
  state: unknown;
}

export type State = {
  session?: ISession;
  confirmations?: ConfirmationState[];
};
export type StateRequired = Required<State>;

export type confiramatorName = string | number | symbol;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type confiramatorsDictionary = Record<confiramatorName, any>;

export interface ConfirmationUpdate {
  id: ConfirmationState['id'];
  state?: ConfirmationState['state'];
  isCompleted?: ConfirmationState['isCompleted'];
}
