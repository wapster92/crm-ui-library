import { ISession, Confirmation, ConfirmationState, ConfirmationUpdate, confiramatorName } from '../use-mfa.types';
import { fromPairs as _fromPairs, toPairs as _toPairs, cloneDeep as _cloneDeep, assign as _assign } from 'lodash';

export const getUpdatedConfirmations = (
  confirmations: ConfirmationState[],
  update: ConfirmationUpdate
): ConfirmationState[] => {
  return confirmations.map((confirmation) => {
    if (confirmation.id !== update.id) {
      return confirmation;
    }

    const updatedConfirmation = _cloneDeep(confirmation);

    if (update.isCompleted !== undefined) {
      updatedConfirmation.isCompleted = update.isCompleted;
    }
    if (update.state !== undefined) {
      updatedConfirmation.state = update.state;
    }

    return updatedConfirmation;
  });
};

export const getConfirmationById = (
  confirmations: ConfirmationState[],
  id: ConfirmationState['id']
): ConfirmationState | null => {
  const foundConfirmation = confirmations.find((confirmation) => confirmation.id === id);
  return foundConfirmation ?? null;
};

export const getStartedConfirmations = (confirmations: ConfirmationState[]): ConfirmationState[] => {
  const startedConfirmations = confirmations.filter((confirmation) => confirmation.isCompleted === false);
  return startedConfirmations;
};

export const splitConfirmationsByStatus = (confirmations: ISession['confirmations']): [string[], string[]] => {
  const confirmationEntries = _toPairs(confirmations);

  return confirmationEntries.reduce(
    (result, [confirmationName, confirmationValue]) => {
      if (confirmationValue === true) {
        result[0].push(confirmationName);
      }

      if (confirmationValue !== true) {
        result[1].push(confirmationName);
      }
      return result;
    },
    [[], []] as [string[], string[]]
  );
};

export const BLANK_SESSION: ISession = {
  session_id: '',
  confirmations: {},
};
export const BLANK_CONFIRMATION: Confirmation = {
  type: null,
};

export const getFirstSession = (session: ISession = BLANK_SESSION, required: confiramatorName[] = []): ISession => {
  const requiredEntries = required.map<[string | symbol | number, Confirmation]>((confirmationName) => [
    confirmationName,
    BLANK_CONFIRMATION,
  ]);
  const requiredConfirmations = _fromPairs<Confirmation>(requiredEntries);
  const updatedConfirmations = _assign(requiredConfirmations, session.confirmations);

  return {
    session_id: session.session_id,
    confirmations: updatedConfirmations,
  };
};

export const handleCompetedConfirmations = (
  completedConfirmationNames: string[],
  startedConfirmations: ConfirmationState[],
  clear: (confirmationState: ConfirmationState) => void
): void => {
  const completedConfirmationNamesSet = new Set(completedConfirmationNames);
  startedConfirmations.forEach((confirmation) => {
    if (completedConfirmationNamesSet.has(confirmation.name)) {
      clear(confirmation);
    }
  });
};

export const getUnstartedConfirmationNames = (
  startedConfirmations: ConfirmationState[],
  uncompletedConfirmationNames: string[]
): string[] => {
  const startedConfirmationsNamesSet = new Set(startedConfirmations.map((confirmationState) => confirmationState.name));
  return uncompletedConfirmationNames.filter((confirmationName) => !startedConfirmationsNamesSet.has(confirmationName));
};
