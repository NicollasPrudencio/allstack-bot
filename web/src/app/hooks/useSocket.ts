/* eslint-disable react-hooks/exhaustive-deps */
import { Socket } from "dgram";
import  { useEffect, useState } from "react";
import io from "socket.io-client";

export function useSocket(url: string): Socket {
  const [socket, setSocket]: Socket | any = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
}
