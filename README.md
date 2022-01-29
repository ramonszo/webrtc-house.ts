# RTCHouse.ts

[![RTCHouse.ts demo](https://raw.githubusercontent.com/ramon82/assets/master/RTChouse.ts/preview.png)](https://on.ramon82.com/3uZMe3I)

## Clubhouse clone using WebRTC and TypeScript

This script is a simple Clubhouse clone made just for studying purposes. 

It uses Websocket, WebRTC and JSX. Also works with React and Vanilla js while maintaning just one source of truth for the templates. 

Live demo: https://on.ramon82.com/3uZMe3I

React sample: https://on.ramon82.com/2SdkbiD

## How to use

Initialize:

```js
const client = RTChouse();
```

Add events:
```js
client.on('action', function (event) {
  // event.type could be: "mute" - could also be extended by something like "raise-hand"
  // this event is used to trigger room member actions
});

client.on('user', function (event) {
  // event.type could be: "update"
  // event.detail.stream is the video/audio stream 
  // this event is triggered when the user joined or disconnected from room
});

client.on('media', function (event) {
  // event.type could be "add" or "remove"
  // event.detail is the media stream
  // this event is used to add/remove the stream object from the page
});

client.on('disconnect', function () {
  // user is disconnected
});

client.on('room:member', function (event) {
  // event.type could be: "add", "remove" or "update"
  // event.detail is the member data
  // this event is used to add/remove/update a room member detail
});
```

You can check the [types](src/types) or [the demo](src/index.html) to get more details. There's also some ready to use [ui components](src/components) which can be customized.

## Limitations

Peer to peer streams work well with a low number of connections, but the performance will decrease as more people join a room. To extend it to support a high number of participants a WebRTC media server is needed - which would require a new [adapter](src/adapters) on this library.

## Useful links
- [Pion](https://github.com/pion/webrtc) - A performant WebRTC media server
- [Dogehouse](https://github.com/benawad/dogehouse) - A full featured Clubhouse open-source alternative

## License

This package is licensed under the [Creative Commons Attribution-NonCommercial 4.0 License](LICENSE.md).