import {Modal, Text} from 'native-base'
import {useAtom} from 'jotai'
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom'

const ExpiredModal = () => {
  const [messageAuth, setMessageAuth] = useAtom(messageAuthAtom)
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
