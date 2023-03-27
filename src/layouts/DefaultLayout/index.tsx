import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />{' '}
      {/* Componente do react-router-dom que é simplesmente um espaço para inserir conteúdo */}
    </LayoutContainer>
  )
}
