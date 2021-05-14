import { RTChouseOptions } from "../types";

export default {
  storageName: "RTChouse",
  api: "localhost:3013",
  icePolicy: "all",
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      url: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
  ],
} as RTChouseOptions;
