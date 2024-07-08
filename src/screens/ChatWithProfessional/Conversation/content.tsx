import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {ChatWithProfessional_StartNavigationProp} from '.';
import {useGetConversationContent} from '@hooks/coversation';
import HeaderBack from '@components/layout/HeaderBack';
import {
  Button,
  HStack,
  Input,
  ChevronLeftIcon,
  Text,
  VStack,
  Box,
  Center,
  TextArea,
} from 'native-base';
// import {Send} from '@assets/icons';
import {tUserResponse} from '@hooks/user/user.interface';
import CryptoJS from 'crypto-js';
import {Platform, TouchableOpacity, View} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Home, Send as SendIcon} from '@assets/icons';
import {colors} from '@assets/colors';
import {color} from 'native-base/lib/typescript/theme/styled-system';

type ContentConversationProps = ChatWithProfessional_StartNavigationProp & {
  ws: WebSocket;
  keyAES: CryptoJS.lib.WordArray;
  conversationId: string;
  curUser: tUserResponse;
};

const ContentConversation: React.FC<ContentConversationProps> = props => {
  const {route, keyAES, conversationId, ws, curUser} = props;
  const {
    data: dataConversationContent,
    isLoading: isConversationContentLoading,
  } = useGetConversationContent(conversationId!);
  const drInformation = route.params;
  const [curMessage, setCurMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [imTyping, setImTyping] = useState(false);
  const [drTyping, setDrTyping] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string>();
  const navigate = useNavigation();
  // console.log(dataConversationContent.data);
  useLayoutEffect(() => {
    if (dataConversationContent?.data) {
      const transformConversationContent: IMessage[] =
        dataConversationContent.data.map(item => {
          console.log(decryptMessage(item.encryptedMessage, keyAES));
          return {
            _id: item.messageId.toString(),
            text: decryptMessage(item.encryptedMessage, keyAES),
            createdAt: new Date(item.createdAt),
            user: {
              _id: curUser.id === item.senderId ? 1 : 2,
              name:
                curUser.id === item.senderId
                  ? curUser.lastName
                  : drInformation.drName,
            },
          };
        });
      setMessages(transformConversationContent);
      console.log(transformConversationContent);
    }
  }, [dataConversationContent]);

  useLayoutEffect(() => {
    const setupWebSocket = async () => {
      ws.onmessage = event => {
        try {
          const res = JSON.parse(event.data);
          if (res?.type === 'typing') {
            setDrTyping(true);
          }
          if (res?.type === 'unTyping') {
            setDrTyping(false);
          }
          if (res?.message && keyAES) {
            const newMessage: IMessage = {
              _id: `${conversationId}-${new Date().getTime()}`,
              text: decryptMessage(res.message, keyAES),
              createdAt: new Date(),
              user: {_id: 2, name: drInformation.drName},
            };
            setMessages(prevMessages =>
              GiftedChat.append(prevMessages, [newMessage]),
            );
            setDrTyping(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      ws.onclose = () => {
        console.log('Disconnected');
      };
      ws.onerror = error => {
        console.log('Error: ' + JSON.stringify(error));
      };
    };
    setupWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const encryptMessage = useCallback(
    (m: string, keyAES: CryptoJS.lib.WordArray) => {
      if (keyAES) {
        return CryptoJS.AES.encrypt(m, keyAES, {
          mode: CryptoJS.mode.ECB,
        }).toString();
      }
      return 'Error encrypt message';
    },
    [keyAES],
  );

  const decryptMessage = useCallback(
    (m: string, keyAES: CryptoJS.lib.WordArray) => {
      if (keyAES) {
        return CryptoJS.AES.decrypt(m, keyAES, {
          mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Utf8);
      }
      return 'Error decrypt message';
    },
    [keyAES],
  );

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      const message = newMessages[0];
      if (ws && conversationId && message.text && keyAES) {
        const encryptedMessage = encryptMessage(message.text, keyAES);
        const msg = JSON.stringify({
          type: 'message',
          conversationId: conversationId,
          message: encryptedMessage,
        });
        try {
          console.log('send message, ', msg);
          ws.send(msg);
          setMessages(prevMessages =>
            GiftedChat.append(prevMessages, [message]),
          );
          setCurMessage('');
        } catch (error) {
          console.log('Something went wrong!', JSON.stringify(error));
        }
      }
    },
    [ws, conversationId, keyAES],
  );

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#fff', // Text color for sent messages
          },
          left: {
            color: '#000', // Text color for received messages
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#2ECC71', // Background color for sent messages
          },
          left: {
            backgroundColor: '#E0E9ED', // Background color for received messages
          },
        }}
      />
    );
  };
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        // containerStyle={{backgroundColor: Colors.background}}
        containerStyle={{paddingVertical: 4}}
      />
    );
  };
  return (
    // <HeaderBack
    //   title={`Bs ${drInformation.drName}`}
    //   bottomPadding="0px"
    //   buttonBack={

    //   }
    //   bottomChildren={
    //     <HStack
    //       justifyContent={'center'}
    //       height={'56px'}
    //       pt={'16px'}
    //       pl={'16px'}
    //       w={'100%'}>
    //       {appointmentId ? (
    //         <HStack space={'8px'} w={'100%'} mr={'16px'}>
    //           <Button flex={1} variant={'cusOutline'}>
    //             Dời lịch
    //           </Button>
    //           <Button flex={3} variant={'cusPrimary'}>
    //             Xác nhận
    //           </Button>
    //         </HStack>
    //       ) : (
    //         <>
    //           <Input
    //             flex={1}
    //             variant={'outline'}
    //             placeholder="Tin nhắn..."
    //             m={0}
    //             value={curMessage}
    //             onChangeText={v => {
    //               if (ws) {
    //                 if (v.length > 0 && !imTyping) {
    //                   const msg = JSON.stringify({
    //                     type: 'typing',
    //                     conversationId: conversationId,
    //                   });
    //                   ws.send(msg);
    //                   setImTyping(true);
    //                 } else {
    //                   const msg = JSON.stringify({
    //                     type: 'unTyping',
    //                     conversationId: conversationId,
    //                   });
    //                   ws.send(msg);
    //                   setImTyping(false);
    //                 }
    //               }
    //               setCurMessage(v);
    //             }}
    //           />
    //           <Button
    //             variant={'unstyled'}
    //             disabled={curMessage.trim().length <= 0}
    //             onPress={() =>
    //               onSend([
    //                 {
    //                   _id: `${conversationId}-${new Date().getTime()}`,
    //                   text: curMessage,
    //                   createdAt: new Date(),
    //                   user: {_id: 1, name: curUser.lastName},
    //                 },
    //               ])
    //             }>
    //             <Send fill={curMessage.length > 0 ? '#C2F8CB' : '#E0E9ED'} />
    //           </Button>
    //         </>
    //       )}
    //     </HStack>
    //   }>
    //   <GiftedChat
    //     messages={messages}
    //     onSend={newMessages => onSend(newMessages)}
    //     user={{_id: 1, name: curUser.lastName}}
    //     isTyping={drTyping}
    //     renderAvatar={null}
    //   />
    // </HeaderBack>
    <SafeAreaView>
      <VStack h={'full'} color={'#fff'}>
        <HStack
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          backgroundColor={'primary.medium25'}
          py={4}>
          <TouchableOpacity
            onPress={() => {
              navigate.goBack();
            }}
            style={{
              position: 'absolute',
              left: 0,
              padding: 8,
            }}>
            <HStack alignItems={'center'} space={'2px'}>
              <ChevronLeftIcon />
              <Text color={'neutral.primary'}>Thoát</Text>
            </HStack>
          </TouchableOpacity>

          <Text variant="caption_regular">{`Bs ${drInformation.drName}`}</Text>
        </HStack>
        <GiftedChat
          messages={messages}
          infiniteScroll
          inverted
          alwaysShowSend
          isTyping={drTyping}
          renderAvatar={null}
          user={{_id: 1, name: curUser.lastName}}
          onSend={newMessages => onSend(newMessages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onInputTextChanged={v => {
            if (v.trim().length > 0) {
              setCurMessage(v);
            } else setCurMessage('');
          }}
          // textInputProps={{
          //   borderRadius: 8,
          //   borderWidth: 1,
          //   borderColor: colors.primary.medium,
          //   paddingHorizontal: 10,
          //   paddingVertical: 8,
          //   fontSize: 16,
          //   marginVertical: 4,
          //   color: colors.text.neutral_primary,
          // }}
          renderComposer={(props: any) => (
            <TextArea
              autoCompleteType
              flex={1}
              ml={4}
              minHeight={'40px'} // Adjust minHeight as per your design
              maxHeight={`${4 * 40}px`} // Adjust maxHeight based on max lines and line height
              fontSize={16}
              lineHeight={'20px'}
              p={2}
              multiline
              variant={'outline'}
              placeholder="Tin nhắn..."
              onChangeText={props.onTextChanged}
            />
          )}
          renderSend={props => (
            <Send
              {...props}
              containerStyle={{
                justifyContent: 'center',
                padding: 8,
              }}>
              <SendIcon fill={curMessage.length > 0 ? '#C2F8CB' : '#E0E9ED'} />
            </Send>
          )}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default ContentConversation;
