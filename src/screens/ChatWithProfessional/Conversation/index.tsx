import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import Splash from '@screens/Auth/Splash';
import {useGetEncryptKey} from '@hooks/coversation';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import ContentConversation from './content';

type ContentTransform = {fromMe: boolean; message: string};
export type ChatWithProfessional_StartNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<
    IRootStackParamList,
    'ChatWithProfessional_Conversation'
  >,
  BottomTabScreenProps<IBottomParamList, 'Advise'>
>;

const ChatWithProfessional_Conversation: React.FC<
  ChatWithProfessional_StartNavigationProp
> = props => {
  const {navigation, route} = props;
  const drInformation = route.params;
  const [curUser] = useAtom(curUserAtom);

  const [ws, setWs] = useState<WebSocket>();
  const [conversationId, setCurConversationId] = useState<string>();
  const getEncryptKey = useGetEncryptKey();
  const [keyAES, setKeyAES] = useState<CryptoJS.lib.WordArray>();

  // Get conversationId
  useEffect(() => {
    const setupWebSocket = async () => {
      const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
      if (curUser && storedSessionId) {
        const drId = drInformation.drId;
        const websocket = new WebSocket(
          `ws://91.108.104.57/ws?targetUserId=${drInformation.drId}`,
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

            if (
              res?.conversationId &&
              res?.conversationId.toString().length > 0
            ) {
              let parseConId: string = res.conversationId.toString();
              let jsEncrypt = new JSEncrypt({default_key_size: '512'}); // mã hóa bất đối xứng RSA ->  key 1 chiều - (key cuộc hội thoại giải mã và mã hóa cái tin nhắn)
              getEncryptKey.mutate(
                {
                  conversationId: parseConId,
                  publicKey: jsEncrypt.getPublicKeyB64(),
                },
                {
                  onSuccess: async aesKeyRes => {
                    const keyAESBeRes = await jsEncrypt.decrypt(aesKeyRes.data);
                    if (typeof keyAESBeRes === 'string') {
                      const decodedKey = CryptoJS.enc.Base64.parse(keyAESBeRes);
                      setKeyAES(decodedKey);
                    } else {
                      console.log(
                        'conversation ~ index ~ No key AES: notify something went wrong and back to chat wih professional home',
                      );
                    }
                  },
                  onError: error => {
                    console.log(
                      'conversation ~ index ~ Fetch key AES error: notify something went wrong and back to chat with professional home',
                      error,
                    );
                  },
                },
              );
              setCurConversationId(parseConId);
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
  }, [drInformation]);
  useEffect(() => {
  }, [conversationId]);
  if (!conversationId || !ws || !keyAES || !curUser) return <Splash />;
  else
    return (
      <ContentConversation
        {...props}
        ws={ws}
        keyAES={keyAES}
        conversationId={conversationId}
        curUser={curUser}
      />
    );
};
export default ChatWithProfessional_Conversation;

const styles = StyleSheet.create({});
