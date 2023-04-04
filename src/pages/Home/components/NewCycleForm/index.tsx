import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext() // o useFormContext só funciona se tivermos um FormProvider enviando as informações (reparar que lá no FormProvider, enviamos TODAS as variáveis presentes atavés do spread operator {...NewCycleForm})

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        placeholder="Dê um nome para seu projeto"
        id="task"
        type="text"
        list="task-suggestions" // linka o datalist abaixo, com as sugestões quando o usuário clicar para digitar no input
        disabled={!!activeCycle} // colocamos os 2 pontos de interrogação para converter a string para boolean false
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
        step={1} // pula de 5 em 5 quando clicamos na setinha do input
        min={0}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })} // valueAsNumber é uma propriedade do register para que declaremos o valor do input como um number
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
