import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {ChatWithProfessional_StartNavigationProp} from '.';
import {useGetConversationContent} from '@hooks/coversation';
import HeaderBack from '@components/layout/HeaderBack';
import {
  Button,
  Center,
  ChevronLeftIcon,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {Send} from '@assets/icons';
import DrInformation from './DrInformation';
import MessageSend from './MessageSend';
import MessageReceive from './MessageReceive';
import {tUserResponse} from '@hooks/user/user.interface';
import CryptoJS from 'crypto-js';
import LoadingDots from '@components/ThreeDotLoading';
import {formatTime} from '@services/function/dateTime';
import {Keyboard, Platform} from 'react-native';
import {useGetAppointmentById} from '@hooks/appointment/getAppointmentById';
import {
  eStatusAppointment,
  tAppointment,
} from '@hooks/appointment/appointment.interface';
import {useUpdateAppointment} from '@hooks/appointment/updateAppoitment';
import MessageSystem from './MessageSystem';
import MessageReplying from './MessageReplying';
import {useAtom} from 'jotai';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';

type ContentConversationProps = ChatWithProfessional_StartNavigationProp & {
  ws: WebSocket;
  keyAES: CryptoJS.lib.WordArray;
  conversationId: string;
  curUser: tUserResponse;
};
type ContentTransform = {fromMe: boolean; message: string; time: string};

const ContentConversation: React.FC<ContentConversationProps> = props => {
  const {route, keyAES, conversationId, ws, curUser} = props;

  // Start Todo: Call api
  const {
    data: dataConversationContent,
    isLoading: isConversationContentLoading,
  } = useGetConversationContent(conversationId!);
  const {
    data: appointmentByConId,
    isLoading: isAppointmentByConIdLoading,
    refetch,
  } = useGetAppointmentById(conversationId!);
  const updateAppointment = useUpdateAppointment();
  // End Todo: Call api
  const drInformation = route.params;
  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef = useRef<any>(null);
  const [curMessage, setCurMessage] = useState('');
  // Handle typing state
  const [imTyping, setImTyping] = useState(false);
  const [drTyping, setDrTyping] = useState(false);
  const [appointment, setAppointment] = useState<tAppointment>();
  const [, setMessageAuth] = useAtom(messageAuthAtom);
  //Set list content
  const [listMessage, setListMessage] = useState<ContentTransform[]>([]);
  useLayoutEffect(() => {
    if (dataConversationContent?.data) {
      let transformConversationContent: ContentTransform[] =
        dataConversationContent.data.map(item => {
          return {
            fromMe: curUser.id === item.senderId,
            message: decryptMessage(item.encryptedMessage, keyAES),
            time: formatTime(item.createdAt),
          };
        });
      setListMessage(transformConversationContent);
    }
  }, [dataConversationContent]);
  useLayoutEffect(() => {
    if (appointmentByConId?.data.appointmentId) {
      refetch().then(item => {
        if (item.data) {
          setAppointment(item.data.data);
        }
      });
      // setAppointment(appointmentByConId?.data.appointment.toString());
    }
  }, [appointmentByConId]);
  // Set up websocket
  useLayoutEffect(() => {
    const setupWebSocket = async () => {
      ws.onmessage = event => {
        try {
          const res = JSON.parse(event.data);
        console.log(res);

          if (res?.type === 'typing') {
            setDrTyping(true);
          } else if (res?.type === 'unTyping') {
            setDrTyping(false);
          } else if (res?.type === 'appointment') {
            refetch(res?.conversationId)
              .then(appointmentRes => {
                {
                  if (res?.status === 'PENDING') {
                    setMessageAuth(
                      `Bs. ${drInformation.drName} đã đặt lịch hẹn. Bạn vui lòng nhấn vào "Xác nhận" để xác nhận lịch hẹn, hoặc dời lịch vì bất kỳ 1 lý do...`,
                    );
                  }
                  setAppointment(appointmentRes.data?.data);
                }
              })
              .catch(e => console.log(e));
          } else if (res?.message && keyAES) {
            setListMessage(prev => [
              ...prev,
              {
                fromMe: false,
                message: decryptMessage(res.message, keyAES),
                time: formatTime(res.createAt),
              },
            ]);
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

  // Handle scroll when view list message change height || receive new message
  useEffect(() => {
    scrollViewRef.current?.scrollTo({y: contentHeight, animated: false});
  }, [contentHeight]);

  //Handle function
  const encryptMessage = useCallback(
    (m: string, keyAES: CryptoJS.lib.WordArray) => {
      if (keyAES) {
        let messEn = CryptoJS.AES.encrypt(m, keyAES, {
          mode: CryptoJS.mode.ECB,
        }).toString();
        return messEn;
      }
      return 'Error encrypt message';
    },
    [keyAES], // Dependency array
  );
  const decryptMessage = useCallback(
    (m: string, keyAES: CryptoJS.lib.WordArray) => {
      if (keyAES) {
        const messDecrypt = CryptoJS.AES.decrypt(m, keyAES, {
          mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Utf8);
        return messDecrypt;
      } else {
        return 'Error decrypt message';
      }
    },
    [keyAES], // Dependency array
  );
  const sendMessage = (
    message: string,
    keyAES: CryptoJS.lib.WordArray,
    conversationId?: string,
  ) => {
    if (ws && conversationId && message && keyAES) {
      const msg = JSON.stringify({
        type: 'message', //typing
        conversationId: conversationId,
        message: encryptMessage(message, keyAES), //dùng key 1 chiều encrypt cái này
        // targetUserId: drInformation.drId,
      });
      const msgUnTyping = JSON.stringify({
        type: 'unTyping', //typing
        conversationId: conversationId,
      });

      try {
        ws.send(msg);
        ws.send(msgUnTyping);
        setImTyping(false);
        setListMessage(prev => [
          ...prev,
          {
            fromMe: true,
            message: message,
            time: formatTime(new Date().toISOString()),
          },
        ]);
        console.log('send message', msg);
        setCurMessage('');
        scrollViewRef.current?.scrollToEnd({animated: false});
      } catch (error) {
        console.log('Some thing went wrong!', JSON.stringify(error));
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      flex={1}>
      <HeaderBack
        title={`Bs ${drInformation.drName}`}
        bottomPadding="0px"
        buttonBack={
          <HStack alignItems={'center'} space={'2px'}>
            <ChevronLeftIcon />
            <Text color={'neutral.primary'}>Thoát</Text>
          </HStack>
        }
        bottomChildren={
          !isConversationContentLoading ? (
            <HStack
              justifyContent={'center'}
              pt={'16px'}
              pl={'16px'}
              w={'100%'}>
              {appointment && appointment.status === 'PENDING' ? (
                <HStack space={'8px'} w={'100%'} mr={'16px'} pb={4}>
                  <Button
                    flex={1}
                    variant={'cusOutline'}
                    onPress={() => {
                      updateAppointment.mutate(
                        {
                          ...appointment,
                          status: eStatusAppointment.CANCELLED,
                        },
                        {
                          onSuccess: e => {
                            setAppointment(e.data);
                            const ms = {
                              ...e.data,
                              type: 'appointment',
                              status: 'CANCELLED',
                            };
                            ws.send(JSON.stringify(ms));
                          },
                        },
                      );
                      const ms = {};
                      // ws.send()
                    }}>
                    Dời lịch
                  </Button>
                  <Button
                    flex={3}
                    variant={'cusPrimary'}
                    onPress={() => {
                      updateAppointment.mutate(
                        {
                          ...appointment,
                          status: eStatusAppointment.CONFIRMED,
                        },
                        {
                          onSuccess: e => {
                            setAppointment(e.data);
                          },
                        },
                      );
                    }}>
                    Xác nhận
                  </Button>
                </HStack>
              ) : (
                <HStack w={'100%'} mb={Platform.OS === 'ios' ? 8 : 0}>
                  <Input
                    flex={1}
                    variant={'outline'}
                    fontSize={14}
                    // multiline
                    placeholder="Tin nhắn..."
                    m={0}
                    value={curMessage}
                    onChangeText={v => {
                      if (ws) {
                        if (v.length > 0 && !imTyping) {
                          const msg = JSON.stringify({
                            type: 'typing', //typing
                            conversationId: conversationId,
                          });
                          console.log('send typing', msg);
                          ws.send(msg);
                          setImTyping(true);
                        }

                        if (v.length <= 0 && imTyping) {
                          const msg = JSON.stringify({
                            type: 'unTyping', //typing
                            conversationId: conversationId,
                          });
                          console.log('send untyping', msg);
                          ws.send(msg);
                          setImTyping(false);
                        }
                      }
                      setCurMessage(v);
                    }}
                  />
                  <Button
                    variant={'unstyled'}
                    disabled={curMessage.trim().length <= 0}
                    onPress={() =>
                      sendMessage(curMessage, keyAES, conversationId)
                    }>
                    <Send
                      fill={curMessage.length > 0 ? '#C2F8CB' : '#E0E9ED'}
                    />
                  </Button>
                </HStack>
              )}
            </HStack>
          ) : null
        }>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentWidth, contentHeight) => {
            setContentHeight(contentHeight);
          }}>
          <VStack flex={1} justifyContent={'flex-end'} space={2} w={'100%'}>
            <DrInformation drName={drInformation.drName} />
            {
              //Render chat
              isConversationContentLoading ? (
                <Center paddingBottom={'40px'}>
                  <Spinner />
                </Center>
              ) : (
                listMessage.length > 0 &&
                listMessage.map((item, index) =>
                  item.fromMe ? (
                    <MessageSend
                      key={item.message + index}
                      text={item.message}
                      time={item.time}
                    />
                  ) : (
                    <MessageReceive
                      key={item.message + index}
                      text={item.message}
                      time={item.time}
                    />
                  ),
                )
              )
            }
            {
              // Real time dr is typing
              drTyping ? <MessageReplying text="Bác sĩ đang trả lời" /> : null
            }

            {
              // Show appointment time when confirmed
              appointment &&
              (appointment.status === 'CONFIRMED' ||
                appointment.status === 'PENDING') ? (
                <MessageSystem
                  text={`Bs. ${drInformation.drName} đã đặt lịch hẹn vào ngày ${appointment.appointmentDate}, ${appointment.startTime} - ${appointment.endTime}`}
                />
              ) : null
            }
          </VStack>
        </ScrollView>
      </HeaderBack>
    </KeyboardAvoidingView>
  );
};

export default ContentConversation;
