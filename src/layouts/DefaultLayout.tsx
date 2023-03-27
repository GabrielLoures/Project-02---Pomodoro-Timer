import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />{' '}
      {/* Componente do react-router-dom que é simplesmente um espaço para inserir conteúdo */}
    </div>
  )
}
