import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const TEMP_TOKEN =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InF3ZTVAZ21haWwuY29tIiwibWVtYmVySWQiOjcsInN1YiI6InF3ZTVAZ21haWwuY29tIiwiaWF0IjoxNjc2OTUyNzkzLCJleHAiOjE2NzY5NTQ1OTN9.gqXLYnDPjGjC7o-qYimuaHsJqisGijoOG8kFoN9D916OsAHNeNFHHg6u-Zc0Z6YIsVfgda1Uix2czgu_WqIgAQ';

export const useWebsocket = (subEndpoint: string) => {
  // TODO: 타입 선언 수정하기
  const [response, setResponse] = useState<any>({});
  const boardId = subEndpoint.split('/').at(-1);

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

      // 받아온 데이터를 응답값에 저장한다.
      client.subscribe(subEndpoint, (res) => setResponse(JSON.parse(res.body)));

      client.publish({
        destination: '/pub/init',
        body: JSON.stringify({
          boardId,
          bidderToken: '',
        }),
      });
    };

    // 컴포넌트 언마운트시 연결을 해제
    return () => {
      client.deactivate();
    };
  }, []);

  const sendBid = (price: string) => {
    const destination = '/pub/bid';

    client.activate();

    client.onConnect = () => {
      console.log('입찰!');
      // FIXME: 입찰 요청 로직 완성하기
      client.publish({
        destination,
        headers: { receipt: 'send-bid-receipt' },
        body: JSON.stringify({
          boardId,
          price,
          bidderToken: TEMP_TOKEN,
        }),
      });
    };
  };

  return { response, sendBid };
};
