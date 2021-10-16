import React from 'react'

import { Input } from '../../Components/Form/Input'
import { Button } from '../../Components/Form/Button'
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton'

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

export function Register () {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />
          
          <TransactionsTypes>
            <TransactionTypeButton 
              type='up'
              title={'Income'}
            />
            <TransactionTypeButton 
              type='down'
              title={'Outcome'}
            />
          </TransactionsTypes>
        </Fields>

        <Button title='Enviar' />
      </Form>
    </Container>
  )
}