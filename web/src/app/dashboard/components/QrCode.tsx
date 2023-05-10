"use client";
import React, { useState, useEffect } from "react";
import { useSocket } from "@hooks/useSocket";
import Image from "next/image";
function QrCode() {
  // Base para implementar
  const [qr, setQr] = useState<string | null>(null);
  const [response, setResponse] = useState("Starting...");
  const io = useSocket("");

  useEffect(() => {
    if (io) {
      io.on("connect", () => {
        setResponse("loading");

        return io.emit("start");
      });

      io.on("connect_error", (err: Error) => {
        setResponse(err.message);
        setQr("/images/bot_off.jpeg");
      });
      io.on("error_process", (erro) => {
        alert(erro.message);
      });
      io.on(
        "conn",
        (data: {
          status: "qrcode" | "authenticated" | "connected" | "loading";
          qr?: string;
          id?: string;
        }) => {
          if (data.status == "qrcode" && data.qr) {
            setQr(data.qr);
          }
          if (data.status == "authenticated" || data.status == "connected")
            setQr("/images/bot_on.webp");
          if (data.status == "loading") setQr("loading...");

          setResponse(data.status);
        }
      );
    }
  }, [io]);
  return (
    <div className="m-4 flex flex-col gap-4">
      <Image src={"/Images/bot_off.jpeg"} alt={"qr"} width={250} height={250} />
      <p>Status: {response}</p>
    </div>
  );
}

export default QrCode;
