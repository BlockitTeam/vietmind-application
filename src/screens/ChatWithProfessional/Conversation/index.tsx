import React, {useEffect, useState, useRef} from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {
  Button,
  ChevronLeftIcon,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Send} from '@assets/icons';
import MessageSend from './MessageSend';
import MessageReceive from './MessageReceive';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {useAtom} from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {IBottomParamList} from '@routes/navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IAdviseStackParamList} from '@routes/navigator/bottomTab/adviesStack';
import EmptyConversation from './EmptyConversation';

type ChatWithProfessional_ConversationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Advise'>,
  NativeStackNavigationProp<IAdviseStackParamList>
>;

const ChatWithProfessional_Conversation = () => {
  const [curUser] = useAtom(curUserAtom);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [curMessage, setCurMessage] = useState('');
  const [listMessage, setListMessage] = useState<
    {fromMe: boolean; message: string}[]
  >([]);

  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    const setupWebSocket = async () => {
      const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
      if (curUser && storedSessionId) {
        const userId = curUser.id;
        const websocket = new WebSocket(
          `ws://192.168.1.32:9001/ws?userId=${userId}`,
          undefined,
          {
            headers: {
              Cookie: `JSESSIONID=${storedSessionId}`,
            },
          },
        );

        websocket.onopen = () => {
          console.log('Connected as ' + userId);
        };

        websocket.onmessage = event => {
          const res = JSON.parse(event.data);
          console.log('🚀 ~ setupWebSocket ~ res:', res);
          if (res?.message) {
            setListMessage(prev => [
              ...prev,
              {fromMe: false, message: res.message},
            ]);
            scrollViewRef.current?.scrollToEnd({animated: true});
          }
        };

        websocket.onclose = () => {
          console.log('Disconnected');
        };

        websocket.onerror = error => {
          console.log('Error: ' + JSON.stringify(error));
        };

        setWs(websocket);
      }
    };

    setupWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [curUser]);

  const sendMessage = (message: string, targetUserId?: number) => {
    if (ws && targetUserId && message) {
      const msg = JSON.stringify({
        type: 'message',
        targetUserId: 13,
        message: message,
      });
      console.log('🚀 ~ sendMessage ~ msg:', msg);
      try {
        ws.send(msg);
        setListMessage(prev => [...prev, {fromMe: true, message: message}]);
        setCurMessage('');
        scrollViewRef.current?.scrollToEnd({animated: true});
      } catch (error) {
        console.log('Some thing went wrong!', JSON.stringify(error));
      }
    }
  };

  return (
    <HeaderBack
      title="Bs. Trịnh Thị Thu Thảo"
      bottomPadding="0px"
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text color={'neutral.primary'}>Thoát</Text>
        </HStack>
      }
      bottomChildren={
        <HStack
          justifyContent={'center'}
          height={'56px'}
          pt={'16px'}
          pl={'16px'}
          w={'100%'}>
          <Input
            flex={1}
            variant={'outline'}
            placeholder="Tin nhắn..."
            m={0}
            value={curMessage}
            onChangeText={setCurMessage}
          />
          <Button
            variant={'unstyled'}
            disabled={curMessage.length <= 0}
            onPress={() => sendMessage(curMessage, curUser?.id)}>
            <Send fill={curMessage.length > 0 ? '#C2F8CB' : '#E0E9ED'} />
          </Button>
        </HStack>
      }>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <VStack
          flex={1}
          justifyContent={'flex-end'}
          space={2}
          w={'100%'}
          minHeight={'100%'}>
          <EmptyConversation />

          {listMessage.map((item, index) =>
            item.fromMe ? (
              <MessageSend key={item.message + index} text={item.message} />
            ) : (
              <MessageReceive key={item.message + index} text={item.message} />
            ),
          )}
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default ChatWithProfessional_Conversation;
