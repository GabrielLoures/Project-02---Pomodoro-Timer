import { createContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // importamos tudo do zod

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date // essa variável é opcional já que, se a pessoa não interromper o ciclo, ela não irá existir
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined // colocamos um undifined, pois podemos não ter nenhum ciclo ativo
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  resetActiveCycleId: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'), // a variável task tem que ser um string com no mínimo 1 caractere e se não atender as especificações, dar a mensagem de erro 'Informe a tarefa'
  minutesAmount: zod.number().min(1).max(60),
}) // usamos o object porque estamos validando um objeto (data é um objeto com as keys task e miniutesAmount)

/* 
  interface newCycleFormData {
  task: string
  minutesAmount: number
  } 
*/

// poderíamos utilizar o interface acima que estaria correto, sem problema nenhum. Mas, como já "tipamos" nossas variáveis na const newCycleFormValidationSchema do zod, aproveitamos para inferir essa tipagem através do type e da funcionalidade do zod.infer

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // Como temos que armazenar vários ciclos (cada ciclo representa uma tarefa), criamos uma array de Cycle[]
  const [cycles, setCycles] = useState<Cycle[]>([])
  // estado para armazenar a informação de qual ciclo está ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // register -> método que adiciona um input ao formulário; ao usarmos o useForm(), é como se estivéssemos criando um novo formulário e o register fala quais campos tem nesse formulário; o register recebe o nome do input e retorna alguns métodos (onChange, onBlur e etc)
  // watch -> método para observar um campo
  // reset -> reseta os campos para o valor original deles (funciona como o setState(""))
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

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
  function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // com essa funcionalidade do getTime(), ele retorna os milissegundos em que foi acionada a função, então fica impossível repetir um id
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // forma correta de escrever setCycles([...cycles, newCycle])

    setActiveCycleId(newCycle.id)
    setAmountSecondPassed(0)

    reset()
  }

  function handleStopCycle() {
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

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            resetActiveCycleId,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleStopCycle} type="button">
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
