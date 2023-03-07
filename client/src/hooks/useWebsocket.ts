import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { ProductDetailRealtimeResp } from '../types/product.type';

export const useWebsocket = (subEndpoint: string) => {
  const [response, setResponse] = useState<Partial<ProductDetailRealtimeResp>>({});
  const boardId = +subEndpoint.split('/').at(-1);
  const client = useRef<Client | null>(null);
  const accessToken = localStorage.getItem('access');

  // 웹소켓 연결을 위한 stomp 클라이언트 생성
  useEffect(() => {
    // 구독 주소로 연결, 받은 메시지를 상태값으로 저장
    client.current = new Client({
      brokerURL: `ws:${process.env.REACT_APP_WEBSOCKET_URL}/ws`,
      debug: (str) => console.log(str),
      // 자동 재연결을 위한 옵션
      reconnectDelay: -1,
      // server와 client의 연결상태 확인을 위한 auto send 기능
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    // 웹소켓 연결
    client.current.onConnect = (frame) => {
      console.log(`connected: ${frame}`);

      // 받아온 데이터를 응답값에 저장한다.
      client.current.subscribe(subEndpoint, (res) => {
        setResponse(JSON.parse(res.body));
      });

      client.current.publish({
        destination: '/pub/init',
        body: JSON.stringify({
          boardId,
          bidderToken: '',
        }),
      });
    };

    // FIXME: 서버에서 전송되는 에러 로그 찍을 수 있도록 수정
    // HTTP 응답값으로 에러 데이터를 보내주고 계시기 때문에 받을 수 있도록 해보기.
    client.current.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers.message);
      console.log('Additional details: ' + frame.body);
      console.log(frame);
    };

    client.current.activate();
    // 컴포넌트 언마운트시 연결을 해제
    return () => {
      client.current.deactivate();
    };
  }, []);

  // 입찰 요청 함수
  const sendBid = (price: number) => {
    const destination = '/pub/bid';

    const body = JSON.stringify({
      boardId,
      price,
      bidderToken: accessToken,
    });

    client.current.publish({
      destination,
      body,
    });
  };

  return { response, sendBid };
};
