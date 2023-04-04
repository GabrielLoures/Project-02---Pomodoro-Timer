import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date // essa variável é opcional já que, se a pessoa não interromper o ciclo, ela não irá existir
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined // colocamos um undifined, pois podemos não ter nenhum ciclo ativo
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  resetActiveCycleId: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  stopCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode // o ReactNode para o typescript e qualquer HTML válido (usado especificamente para o children de um contexto)
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // Como temos que armazenar vários ciclos (cada ciclo representa uma tarefa), criamos uma array de Cycle[]
  const [cycles, setCycles] = useState<Cycle[]>([])
  // estado para armazenar a informação de qual ciclo está ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function resetActiveCycleId() {
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  // recebe os dados dos inputs do nosso formulário (data)
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // com essa funcionalidade do getTime(), ele retorna os milissegundos em que foi acionada a função, então fica impossível repetir um id
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // forma correta de escrever setCycles([...cycles, newCycle])

    setActiveCycleId(newCycle.id)
    setAmountSecondPassed(0)
  }

  function stopCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        resetActiveCycleId,
        setSecondsPassed,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
