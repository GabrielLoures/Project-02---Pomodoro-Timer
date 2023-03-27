import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent; /* colocamos essas duas bordas transparentes porque no hover elas devem ficar verdes */

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
        /* active é uma classe inerente ao NavLink, e quando ela estiver ativada (active), vai acontencer a mudança de CSS; REPARAR QUE COMO O ACTIVE É UMA CLASSE, SEPARAMOS O & POR PONTO AO INVÉS DE DOIS PONTOS*/
      }
    }
  }
`
