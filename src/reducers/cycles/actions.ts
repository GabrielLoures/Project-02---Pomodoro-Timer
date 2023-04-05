import { Cycle } from './reducer'

// criamos esse enum (dicionário) do typescript para facilitar uma futura manutenção do código (não era algo necessário para o funcionamento da aplicação)
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function stopCurrentCycleAction() {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE,
  }
}
