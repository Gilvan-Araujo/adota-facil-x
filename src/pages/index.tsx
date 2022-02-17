import { Slider, useMediaQuery } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import * as S from '@styles/pages/Home'

import logo from '../../public/logo.svg'

function Home() {
  const router = useRouter()

  const matches = useMediaQuery('(min-width:430px)')
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <>
      <Head>
        <title>Adota Fácil</title>
        <meta
          name="description"
          content="Aplicativo para testes de estilos de interação"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <S.HomeContainer>
        <h1 style={{ display: 'none' }}>Adota fácil</h1>
        <Image alt="Logo Adota Fácil" src={logo} height={75} />

        <S.OptionsContainer>
          <div className={`${sliderValue <= 20 ? 'highlight' : ''}`}>
            Lista de pets
          </div>
          <Slider
            orientation={`${matches ? 'horizontal' : 'vertical'}`}
            className="slider"
            defaultValue={50}
            onChange={(_, value) => {
              if (typeof value === 'number') setSliderValue(value)
            }}
            onChangeCommitted={(_, value) => {
              if (value <= 20) router.push('/pets')
              if (value >= 80) router.push('/pet/novo')
            }}
          />
          <div className={`${sliderValue >= 80 ? 'highlight' : ''}`}>
            Cadastrar um pet
          </div>
        </S.OptionsContainer>
      </S.HomeContainer>
    </>
  )
}

export default Home
