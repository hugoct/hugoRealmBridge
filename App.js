/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { SafeAreaView, View, Button, Alert, StatusBar } from 'react-native';

import {
  select,
  insert,
  insertMany,
  insertOrUpdateMany,
  deleteOne,
  deleteMany,
  update,
} from 'hugo-realm-lib';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView
        style={{
          flex: 3,
          justifyContent: 'space-between',
        }}
      >
        <Button
          title='Insert'
          onPress={() =>
            insert(
              {
                name: 'Hugo',
                email: 'hugo@email.com',
                address: 'Rua',
              },
              (res, error) => {
                Alert.alert('Inseriu', JSON.stringify(res));
              }
            )
          }
        />
        <Button
          title='Insert Many'
          onPress={() =>
            insertMany(
              [
                {
                  name: 'Hugo3',
                  email: 'hugo@email.com',
                  address: 'Rua',
                },
                {
                  name: 'Hugo4',
                  email: 'hugo@email.com',
                  address: 'Rua',
                },
                { name: 'Hugo5', email: 'hugo@email.com', address: 'Rua' },
              ],
              (res, error) => Alert.alert('Inseriu', JSON.stringify(res))
            )
          }
        />
        <Button
          title='Insert Update Many'
          onPress={() =>
            insertOrUpdateMany(
              [
                {
                  name: 'Hugo3',
                  email: 'hugo@email.com',
                  address: 'Rua',
                },
                {
                  name: 'Hugo4',
                  email: 'hugo@email.com',
                  address: 'Rua',
                },
                { name: 'Hugo5', email: 'hugo@email.com', address: 'Rua' },
              ],
              (res, error) => Alert.alert('Inseriu', JSON.stringify(res))
            )
          }
        />
        <Button
          title='Update'
          onPress={() =>
            select((res, error) => {
              if (res.length) {
                update(
                  {
                    id: res[0].id,
                    name: 'Hugo update',
                    email: 'hugo@email.com',
                    address: 'Rua',
                  },
                  (resUpdate, error) =>
                    Alert.alert('Atualizou', `ID ${res[0].id} atualizado`)
                );
              } else {
                Alert.alert('Aviso', 'sem itens para atualizar');
              }
            })
          }
        />
        <Button
          title='Delete'
          onPress={() =>
            select((res, error) => {
              if (res.length) {
                deleteOne(res[0].id, (resDel, error) =>
                  Alert.alert('Apagou', `ID ${res[0].id} apagado`)
                );
              } else {
                Alert.alert('Aviso', 'sem itens para apagar');
              }
            })
          }
        />
        <Button
          title='Delete Many'
          onPress={() =>
            select((res, error) => {
              if (res.length > 1) {
                deleteMany([res[0].id, res[1].id], (resDel, error) =>
                  Alert.alert(
                    'Apagou',
                    `IDs ${res[0].id} e ${res[1].id} apagados`
                  )
                );
              } else if (res.length) {
                deleteMany([res[0].id], (resDel, error) =>
                  Alert.alert('Apagou', `ID ${res[0].id} apagado`)
                );
              } else {
                Alert.alert('Aviso', 'sem itens para apagar');
              }
            })
          }
        />
        <Button
          title='Select'
          onPress={() =>
            select((res, error) => {
              Alert.alert(`Registros: ${res.length}`, JSON.stringify(res));
            })
          }
        />
      </SafeAreaView>
      <View style={{ flex: 2 }} />
    </Fragment>
  );
};

export default App;
