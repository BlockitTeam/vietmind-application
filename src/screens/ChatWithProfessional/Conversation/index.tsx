import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import HeaderBack from '@components/layout/HeaderBack';
global.Buffer = require('buffer').Buffer;
import {
  Button,
  Center,
  ChevronLeftIcon,
  Circle,
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
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {IAdviseStackParamList} from '@routes/navigator/bottomTab/adviesStack';
import EmptyConversation from './EmptyConversation';

import {useGetConversationContent, useGetEncryptKey} from '@hooks/coversation';
import Splash from '@screens/Auth/Splash';

import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

// type ChatWithProfessional_ConversationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<IBottomParamList, 'Advise'>,
//   NativeStackNavigationProp<IAdviseStackParamList>
// >;

// type ChatWithProfessionalConversationProps = {
//   conversationId: number;
// };

type ContentTransform = {fromMe: boolean; message: string};
type ChatWithProfessional_StartNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<
    IRootStackParamList,
    'ChatWithProfessional_Conversation'
  >,
  BottomTabScreenProps<IBottomParamList, 'Advise'>
>;
// let conversationId = '1';

const ChatWithProfessional_Conversation: React.FC<
  ChatWithProfessional_StartNavigationProp
> = props => {
  const {navigation, route} = props;
  const drInformation = route.params;
  const [curUser] = useAtom(curUserAtom);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [curMessage, setCurMessage] = useState('');
  const [listMessage, setListMessage] = useState<ContentTransform[]>([]);
  const [conversationId, setCurConversationId] = useState<string>();
  const scrollViewRef = useRef<any>(null);

  const [imInputting, setImInputting] = useState<boolean>();
  const [drIsInputting, setDrIsInputting] = useState<boolean>();

  const {
    data: dataConversationContent,
    isLoading: isConversationContentLoading,
    refetch: refetchConversationContent,
  } = useGetConversationContent(conversationId!);
  const [keyAES, setKeyAES] = useState<CryptoJS.lib.WordArray>();
  const [contentHeight, setContentHeight] = useState(0);

  const encryptMessage = useCallback(
    (m: string) => {
      console.log('🚀 ~ keyAES:', keyAES);

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
    (m: string) => {
      console.log('🚀 ~ keyAES:', keyAES);
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

  // Get conversationId
  useLayoutEffect(() => {
    const setupWebSocket = async () => {
      const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
      if (curUser && storedSessionId) {
        const drId = drInformation.drId;
        const websocket = new WebSocket(
          `ws://91.108.104.57:9001/ws?targetUserId=${drInformation.drId}`,
          undefined,
          {
            headers: {
              Cookie: `JSESSIONID=${storedSessionId}`,
            },
          },
        );

        websocket.onopen = () => {
          console.log('Connected as ' + drId);
        };

        websocket.onmessage = event => {
          try {
            const res = JSON.parse(event.data);
            if (res?.type === 'typing') {
              setDrIsInputting(true);
            }
            console.log(res);
            if (res?.conversationId) {
              console.log('set');
              setCurConversationId(res.conversationId);
            }
            if (res?.message) {
              console.log('🚀 ~ setupWebSocket ~ res:', res);

              setListMessage(prev => [
                ...prev,
                {fromMe: false, message: decryptMessage(res.message)},
              ]);
            }
          } catch (error) {
            console.log(error);
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
  }, [drInformation, keyAES]);

  // Get AES key using RSA
  const getEncryptKey = useGetEncryptKey();
  useEffect(() => {
    if (conversationId) {
      refetchConversationContent();
      var jsEncrypt = new JSEncrypt({default_key_size: '512'}); // mã hóa bất đối xứng RSA ->  key 1 chiều - (key cuộc hội thoại giải mã và mã hóa cái tin nhắn)
      getEncryptKey.mutate(
        {
          conversationId: conversationId,
          publicKey: jsEncrypt.getPublicKeyB64(),
        },
        {
          onSuccess: async aesKeyRes => {
            const keyAESBeRes = await jsEncrypt.decrypt(aesKeyRes.data);
            if (typeof keyAESBeRes === 'string') {
              const decodedKey = CryptoJS.enc.Base64.parse(keyAESBeRes);
              setKeyAES(decodedKey);
            }
          },
          onError: e => {
            console.log('🚀 ~ getEncryptKey.mutate ~ e:', e);
          },
        },
      );
    }
  }, [conversationId]);

  //Get content
  useEffect(() => {
    if (dataConversationContent?.data && curUser && keyAES) {
      let transformConversationContent: ContentTransform[] =
        dataConversationContent.data.map(item => {
          return {
            fromMe: curUser.id !== item.senderId ? false : true,
            message: decryptMessage(item.encryptedMessage),
          };
        });
      setListMessage(transformConversationContent);
    }
  }, [dataConversationContent, keyAES, conversationId]);
  //Use effect: Handle scroll
  useEffect(() => {
    scrollViewRef.current?.scrollTo({y: contentHeight, animated: true});
  }, [contentHeight]);

  const sendMessage = (message: string, conversationId?: string) => {
    if (ws && conversationId && message && keyAES) {
      const msg = JSON.stringify({
        type: 'message', //typing
        conversationId: conversationId,
        message: encryptMessage(message), //dùng key 1 chiều encrypt cái này
      });
      console.log('🚀 ~ sendMessage ~ msg:', encryptMessage(message));
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

  const changeInputMessage = (message: string) => {
    if (ws) {
      if (message.trim().length > 0) {
        const msg = JSON.stringify({
          type: 'typing', //typing
          conversationId: conversationId,
          // message: encryptMessage(message), //dùng key 1 chiều encrypt cái này
        });
      }
    }
    setCurMessage(message);
  };

  return !curUser || !conversationId ? (
    <Splash />
  ) : (
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
            onChangeText={v => {
              if (ws) {
                if (v.length > 0) {
                  // ws.send()
                }
              }
              setCurMessage(v);
            }}
          />
          <Button
            variant={'unstyled'}
            disabled={curMessage.trim().length <= 0}
            onPress={() => sendMessage(curMessage, conversationId)}>
            <Send fill={curMessage.length > 0 ? '#C2F8CB' : '#E0E9ED'} />
          </Button>
        </HStack>
      }>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setContentHeight(contentHeight);
        }}>
        <VStack
          flex={1}
          justifyContent={'flex-end'}
          space={2}
          w={'100%'}
          minHeight={'100%'}>
          <EmptyConversation drName={drInformation.drName} />

          {!isConversationContentLoading &&
            listMessage.length > 0 &&
            //   <Center>
            //     <Text>Loading...</Text>
            //   </Center>
            // ) : (
            listMessage.map((item, index) =>
              item.fromMe ? (
                <MessageSend key={item.message + index} text={item.message} />
              ) : (
                <MessageReceive
                  key={item.message + index}
                  text={item.message}
                />
              ),
            )}
            {
              drIsInputting && (
              <Text>Typing ...</Text>
              )
            }
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default ChatWithProfessional_Conversation;
