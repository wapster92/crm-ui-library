import { ISession, confiramatorsDictionary, State, ConfirmationState, ConfirmationUpdate } from './use-mfa.types.ts';
import {
  getUpdatedConfirmations,
  getConfirmationById,
  getStartedConfirmations,
  getUnstartedConfirmationNames,
  splitConfirmationsByStatus,
  handleCompetedConfirmations,
  getFirstSession,
} from './helpers/helpers.ts';

export const useMFA = <T extends confiramatorsDictionary>(
  confirmators: T,
  required?: (keyof T)[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const start = (
    getState: () => State,
    updateState: (session: ISession, confirmations: ConfirmationState[]) => void,
    onSucces: (state: State) => void,
    onError: (error: Error) => void
  ): void => {
    const handleAllComplted = (): void => {
      const state = getState();
      const isAllCompleted = (state.confirmations ?? []).every((confirmation) => confirmation.isCompleted);
      if (isAllCompleted) {
        onSucces(state);
      }
    };
    const updateSelf = (update: ConfirmationUpdate): void => {
      const { session, confirmations } = getState();

      if (confirmations === undefined || session === undefined) {
        return;
      }

      const newConfirmations = getUpdatedConfirmations(confirmations, update);

      updateState(session, newConfirmations);
    };
    const getSelf = (id: string): ConfirmationState | null => {
      const { confirmations } = getState();
      if (confirmations === undefined) return null;
      return getConfirmationById(confirmations, id);
    };

    const getSession = (): ISession | undefined => getState().session;
    const updateSession = (newSession?: ISession): void => {
      if (newSession !== undefined) {
        const state = getState();
        const confirmations = state.confirmations ?? [];

        const startedConfirmations = getStartedConfirmations(confirmations);
        const [completedConfirmationNames, uncompletedConfirmationNames] = splitConfirmationsByStatus(
          newSession.confirmations
        );

        handleCompetedConfirmations(completedConfirmationNames, startedConfirmations, (confirmationState) => {
          confirmationState.emitter.all.clear();
          updateSelf({ id: confirmationState.id, isCompleted: true });
        });

        const unstartedConfirmationNames = getUnstartedConfirmationNames(
          startedConfirmations,
          uncompletedConfirmationNames
        );

        const isAllConfirmationsSupported = unstartedConfirmationNames.every(
          (confirmationName) => confirmators[confirmationName] !== undefined
        );
        if (!isAllConfirmationsSupported) {
          const unsupportedConfirmations = unstartedConfirmationNames.filter(
            (confirmationName) => confirmators[confirmationName] === undefined
          );
          onError(new Error(`The following confirmations are not supported ${unsupportedConfirmations.join()}`));
          return;
        }

        const newConfirmations = unstartedConfirmationNames.map((confirmationName) =>
          confirmators[confirmationName](getSession, updateSession, updateSelf, getSelf)
        );

        updateState(newSession, [...confirmations, ...newConfirmations]);
      }

      handleAllComplted();
    };

    const firstSession = getFirstSession(getSession(), required);
    updateSession(firstSession);
  };
  return {
    start,
  };
};
