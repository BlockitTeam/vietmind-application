import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Modal, Text} from 'native-base';
import {useAtom} from 'jotai';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';

const ExpiredModal = () => {
  const [messageAuth, setMessageAuth] = useAtom(messageAuthAtom);
  console.log('12412412412412412', messageAuth);
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
        <Modal.CloseButton />
        <Modal.Header>Contact Us</Modal.Header>
        <Modal.Body>
          <Text>{messageAuth}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ExpiredModal;

const styles = StyleSheet.create({});
