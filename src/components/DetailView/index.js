import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useFetch } from 'react-hooks-fetch'
import Container from 'components/Container'
import { Arrow, IMDB } from 'components/Icon'
import { Row, Cell } from 'components/Grid'
import Text from 'components/Text'
import Button from 'components/Button'
import ToggleButton from 'components/ToggleButton'
import InfoScreen from 'components/InfoScreen'
import Meta from './Meta'
import Info from './Info'
import Image from './Image'


const Wrapper = styled.div`
	flex: 1
	display: flex;
	flex-direction: column;
	transition: 0.2s all;
	margin-bottom: ${p => p.error ? 0 : '6rem'};
`

const BackLink = styled.button`
	background: ${p => p.theme.colors.dark};
	border: none;
	display: block;
	appearance: none;
	${'' /* min-width: 100%; */}
	width: calc(100% + 0.5rem);
	color: ${p => p.theme.colors.lightGrey};
	cursor: pointer;
	border-radius: 0.25rem;
	margin: 0 -0.5rem;
	padding: 0.75rem 0 0.75rem 0.5rem;
	position: sticky;
	top: 0;
	&:hover{
		color: ${p => p.theme.colors.white};
	}
	&:focus{box-shadow: inset 0 0 0 0.125rem ${p => p.theme.colors.yellow}}
	&:before{
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0 0 4rem ${p => p.theme.colors.dark};
	}
`


const DetailView = ({movieId}) => {
	const { error, loading, data } = useFetch([
		`https://api.themoviedb.org/3/movie/${movieId}`,
		`?api_key=${process.env.REACT_APP_TMDB_KEY}`,
		`&append_to_response=release_dates,external_ids,credits`
	].join(''))

	useEffect(() => {
		document.title = `Movies ${data?.title && ` ⠿ ${data.title}`}`
	}, [data])

	const image = data?.poster_path || ''

	return(
		<Wrapper error={error}>
			<Container>
				<BackLink onClick={() => window.history.back()}><Arrow/></BackLink>
				{!loading && data && (
					<Row vertical-gutter style={{justifyContent: 'space-between'}}>
						<Cell xs={12} md={6} style={{marginBottom: '1.5rem'}}>
							<Meta {...data}/>
							<Text weight={600} xs={2} sm={3} md={4} xg={5}>{data.title}</Text>
							<div style={{display: 'flex', margin: '1rem -0.5rem'}}>
								{!!data.vote_average && !!data.imdb_id && (
									<Button imdb={data.imdb_id} background='#FF9F1C' logo={<IMDB color='#0A1014'/>}>
										{data.vote_average}/10
									</Button>
								)}
								<ToggleButton movieId={movieId}/>
							</div>
							<Info {...data}/>
						</Cell>
						<Cell xs={12} sm={12} md={5} lg={5}>
							<Image alt={`poster for the movie: ${data.title}`} image={image}/>
						</Cell>
					</Row>
				)}
			</Container>
			{error && (
				<Container style={{flex: 1}}>
					<InfoScreen emoji='❌' title='I’m sorry Dave' description='I’m afraid i can’t do that'/>
				</Container>
			)}
		</Wrapper>
	)
}

export default DetailView
