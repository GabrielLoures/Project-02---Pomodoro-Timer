import { useContext } from 'react'
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
import { CyclesContext } from '../../contexts/CyclesContext'

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

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, stopCurrentCycle } =
    useContext(CyclesContext)
  // register -> método que adiciona um input ao formulário; ao usarmos o useForm(), é como se estivéssemos criando um novo formulário e o register fala quais campos tem nesse formulário; o register recebe o nome do input e retorna alguns métodos (onChange, onBlur e etc)
  // watch -> método para observar um campo
  // reset -> reseta os campos para o valor original deles (funciona como o setState(""))
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={stopCurrentCycle} type="button">
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
