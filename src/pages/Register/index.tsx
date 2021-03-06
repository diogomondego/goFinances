import React, { useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { InputForm } from '../../Components/Form/InputForm'
import { Button } from '../../Components/Form/Button'
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton'

import { CategorySelect } from '../CategorySelect'

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório')
}).required();

export function Register () {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect (type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal () {
    setCategoryModalOpen(true)
  }
  
  function handleCloseSelectCategoryModal () {
    setCategoryModalOpen(false)
  }

  function handleRegister (form: FormData) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria')
    
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder="Nome"
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              name='amount'
              control={control}
              placeholder="Preço"
              keyboardType='numeric'
              error={errors.amount?.message}
            />
            
            <TransactionsTypes>
              <TransactionTypeButton 
                type='up'
                title={'Income'}
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                type='down'
                title={'Outcome'}
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>
            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button 
            title='Enviar' 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal 
          visible={categoryModalOpen} 
          animationType='slide' 
          statusBarTranslucent
        >
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeCategorySelect={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}