# RTChouse.ts

[![RTChouse.ts demo](https://raw.githubusercontent.com/ramon82/assets/master/RTChouse.ts/preview.png)](https://on.ramon82.com/3uZMe3I)

## WebRTC voice rooms API

Add voice rooms EVERYWHERE! This script creates an API to manage voice rooms - just like the most cloned app of the year.

Live demo: https://on.ramon82.com/3uZMe3I

React sample: https://on.ramon82.com/2SdkbiD

#### Whats the difference between this and other clones?

There's other clones just like [dogehouse.tv](https://github.com/benawad/dogehouse) - a full featured hosted social network. 

RTChouse is just a simpler script to manage the rooms through the browser.

#### Features
* Vanilla ~~JavaScript~~ TypeScript
* **True** React support
* A simple API to manage your rooms

## How to use
Clone this repository and execute ```npm run start```

## API
Initialize:

```js
let voiceRooms = RTChouse({
  storageName: "RTChouse", // localStorage namespace
  api: process.env.NODE_ENV === 'development' ? "localhost:3013" : undefined, // server api hostname. leave undefined to use default hostname
});
```

Set user:

```js   
voiceRooms.user.set({
  name: 'User name',
});
 ```

Set room:

```js
voiceRooms.room.set({
  name: 'Room name',
});
```

Init room:

```js
voiceRooms.init(callback);
```

You can import React components directly from the lib or use it on Vanilla js through

```js
voiceRooms.components[ComponentName]({...ComponentOptions})
```

## Events
Listen for room events using:

```js
voiceRooms.on('eventName', callback);
```

The available events are:
- data: when any data of RTChouse is changed
- room: when room data is changed
- room:member: when room member is added/removed
- user: when user is changed
- media: when the media stream is changed
- disconnect: when user disconnect
- error: when an error occurs
- action: when user do some action, like "mute"

Check the type definition for the event details.

## Limitations
Currently the only adapter available is peer 2 peer - which means all users in the room send it's stream to the other users. Rooms using this adapter should be performant at the maximum of 8 users.

Adapters can be extended using other RTC distribuition strategies, like [Mediasoup](https://mediasoup.org/) for example.

## License
CC BY-NC 4.0 - This project is intended only for educational purposes. Commercial use is currently not authorized.


## Show your support!
Please ⭐️ this repository if this project helped you! Feel free to buy me a coffee:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F710G8L)