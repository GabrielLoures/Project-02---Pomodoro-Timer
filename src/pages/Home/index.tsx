import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' // importamos tudo do zod

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// usamos o object porque estamos validando um objeto (data é um objeto com as keys task e miniutesAmount)
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'), // a variável task tem que ser um string com no mínimo 1 caractere e se não atender as especificações, dar a mensagem de erro 'Informe a tarefa'
  minutesAmount: zod.number().min(5).max(60),
})

// interface newCycleFormData {
//   task: string
//   minutesAmount: number
// }

// poderíamos utilizar o interface acima que estaria correto, sem problema nenhum. Mas, como já "tipamos" nossas variáveis na const newCycleFormValidationSchema do zod, aproveitamos para inferir essa tipagem através do type e da funcionalidade do zod.infer

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // register -> método que adiciona um input ao formulário; ao usarmos o useForm(), é como se estivéssemos criando um novo formulário e o register fala quais campos tem nesse formulário; o register recebe o nome do input e retorna alguns métodos (onChange, onBlur e etc)
  // watch -> método para observar um campo
  // reset -> reseta os campos para o valor original deles (funciona como o setState(""))
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // recebe os dados dos inputs do nosso formulário (data)
  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para seu projeto"
            id="task"
            type="text"
            list="task-suggestions" // linka o datalist abaixo, com as sugestões quando o usuário clicar para digitar no input
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 01" />
            <option value="Projeto 02" />
            <option value="Projeto 03" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            id="minutesAmount"
            type="number"
            step={5} // pula de 5 em 5 quando clicamos na setinha do input
            min={0}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })} // valueAsNumber é uma propriedade do register para que declaremos o valor do input como um number
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
