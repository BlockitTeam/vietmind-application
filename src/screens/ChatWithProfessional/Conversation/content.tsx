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
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {Send} from '@assets/icons';
import EmptyConversation from './EmptyConversation';
import MessageSend from './MessageSend';
import MessageReceive from './MessageReceive';
import {tUserResponse} from '@hooks/user/user.interface';
import CryptoJS from 'crypto-js';
import LoadingDots from '@components/ThreeDotLoading';

type ContentConversationProps = ChatWithProfessional_StartNavigationProp & {
  ws: WebSocket;
  keyAES: CryptoJS.lib.WordArray;
  conversationId: string;
  curUser: tUserResponse;
};
type ContentTransform = {fromMe: boolean; message: string};

const ContentConversation: React.FC<ContentConversationProps> = props => {
  const {route, navigation, keyAES, conversationId, ws, curUser} = props;
  const {
    data: dataConversationContent,
    isLoading: isConversationContentLoading,
  } = useGetConversationContent(conversationId!);
  const drInformation = route.params;
  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef = useRef<any>(null);
  const [curMessage, setCurMessage] = useState('');

  // Handle typing state
  const [imTyping, setImTyping] = useState(false);
  const [drTyping, setDrTyping] = useState(false);

  //Set list content
  const [listMessage, setListMessage] = useState<ContentTransform[]>([]);
  useLayoutEffect(() => {
    if (dataConversationContent?.data) {
      let transformConversationContent: ContentTransform[] =
        dataConversationContent.data.map(item => {
          return {
            fromMe: curUser.id !== item.senderId ? false : true,
            message: decryptMessage(item.encryptedMessage, keyAES),
          };
        });
      setListMessage(transformConversationContent);
    }
  }, [dataConversationContent]);
  // Set up ws
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
            setListMessage(prev => [
              ...prev,
              {fromMe: false, message: decryptMessage(res.message, keyAES)},
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
    scrollViewRef.current?.scrollTo({y: contentHeight, animated: true});
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
      });
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
                if (v.length > 0 && !imTyping) {
                  const msg = JSON.stringify({
                    type: 'typing', //typing
                    conversationId: conversationId,
                  });
                  ws.send(msg);
                  setImTyping(true);
                } else {
                  const msg = JSON.stringify({
                    type: 'unTyping', //typing
                    conversationId: conversationId,
                  });
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
            onPress={() => sendMessage(curMessage, keyAES, conversationId)}>
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

          {isConversationContentLoading ? (
            <Center paddingBottom={'40px'}>
              <Spinner />
            </Center>
          ) : (
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
            )
          )}
          {drTyping && <LoadingDots title="Bác sĩ đang trả lời" dotSize={2} />}
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default ContentConversation;
