# BPM ♥️

<div align="center">

<img src=https://user-images.githubusercontent.com/85013922/242486429-8b842e16-dc30-4739-a209-99cb1865a612.png width=600 />

*Webpage*

</div>

## Installation

```
git clone https://github.com/austinliuigi/bpm.git
cd bpm
npm install
```

## Usage

#### 1. Start the server

`node server.js`

#### 2. Start the app

`npm run dev`

#### 3. Publish sensor data to mqtt broker

*Option 1 (Mock sensor data)*:

Run `publisher.py` in the mqtt directory. This requires [paho-mqtt](https://pypi.org/project/paho-mqtt/).


*Option 2 (Real sensor data)*:

Upload `publisher.ino` to an ESP32.

## How it works

<div align="center">

<img src=https://user-images.githubusercontent.com/85013922/242484926-935e8a65-b3e4-4dfb-9c79-dd4f5998be0d.png width=600 />

*Communication Architecture*

</div>
