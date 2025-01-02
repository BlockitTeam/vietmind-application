import {StyleSheet} from 'react-native'
import React, {useEffect} from 'react'
import {Modal, Text} from 'native-base'
import {useAtom} from 'jotai'
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom'

const ExpiredModal = () => {
  const [messageAuth, setMessageAuth] = useAtom(messageAuthAtom)
  // useEffect(() => {
  //   return () => {
  //     setMessageAuth(undefined);
  //   };
  // }, [messageAuth]);
  return (
    <Modal
      isOpen={messageAuth !== undefined}
      onClose={() => setMessageAuth(undefined)}>
      <Modal.Content maxWidth="400px">
        <Modal.Header borderBottomWidth={0}>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>{messageAuth}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ExpiredModal

const styles = StyleSheet.create({})
