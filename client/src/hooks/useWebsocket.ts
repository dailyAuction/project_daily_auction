import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

export const useWebsocket = (subEndpoint = '/sub/board-id/2') => {
  const [response, setResponse] = useState<any>({});

  // 웹소켓 연결을 위한 stomp 클라이언트 생성
  const client = new Client({
    brokerURL: `ws:${process.env.REACT_APP_WEBSOCKET_URL}/ws`,
    debug: (str) => console.log(str),
    // 자동 재연결을 위한 옵션
    reconnectDelay: -1,
    // server와 client의 연결상태 확인을 위한 auto send 기능
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  useEffect(() => {
    // 구독 주소로 연결, 받은 메시지를 상태값으로 저장
    client.activate();
    client.onConnect = (frame) => {
      console.log(`connected: ${frame}`);
      client.subscribe(subEndpoint, (res) => setResponse(res.body));
    };

    // 컴포넌트 언마운트시 연결을 해제
    return () => {
      client.deactivate();
    };
  }, []);

  const sendBid = (price: string) => {
    const boardId = subEndpoint.split('/').at(-1);
    const destination = '/pub/bid';
    client.publish({
      destination,
      body: JSON.stringify({
        boardId,
        price,
        bidderToken: '~~',
      }),
    });
  };

  return { response, sendBid };
};
