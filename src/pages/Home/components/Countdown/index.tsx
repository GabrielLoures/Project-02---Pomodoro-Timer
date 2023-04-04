import { useEffect, useContext } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../..'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    resetActiveCycleId,
    setSecondsPassed,
  } = useContext(CyclesContext)
  // estado para armazenar quantos segundos passaram

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60) // o Math.floor arredonda a conta pra baixo, isso evita recebermos número de minutos quebrado
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0') // padStart, nesse caso -> queremos que tenha 2 caracteres, se não tiver, coloque 0 no início dela
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassed(totalSeconds)
          resetActiveCycleId()

          clearInterval(interval) // para de executar o setInterval quando o cronômetro chegar a 0
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    resetActiveCycleId,
    setSecondsPassed,
  ]) // sempre que usamos uma variável externa ao useEffect, temos que utilizá-la como dependência

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
