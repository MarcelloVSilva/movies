import styled, {css} from 'styled-components'

const Wrapper = styled.button`
	background: none;
	border: none;
	display: inline-flex;
	color: currentColor;
	text-decoration: none;
	border-radius: 0.25rem;
	box-shadow: inset 0 0 0 1px ${p => p.theme.colors.midGrey};
	color: ${p => p.theme.colors.lightGrey};
	overflow: hidden;
	margin: 1rem 0.5rem;
	cursor: pointer;
	&:hover{
		color: ${p => p.theme.colors.white};
		background: ${p => p.theme.colors.red};
		box-shadow: inset 0 0 0 1px ${p => p.theme.colors.red};
	}
	${p => p.isFavorite && css`
		color: ${p => p.theme.colors.white};
		background: ${p => p.theme.colors.red};
		box-shadow: inset 0 0 0 1px ${p => p.theme.colors.red};
	`}
	&:focus{box-shadow: inset 0 0 0 0.125rem ${p => p.theme.colors.red}}
`

const Left = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.75rem 0.5rem;
`

const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 0.5rem 0.5rem 0;
`

export { Wrapper, Left, Right }