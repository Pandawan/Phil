## Inspiration
When we showed up to CruzHacks, we didn't really have an idea in mind, but we knew we wanted to play around with as many tools and APIs as possible. At 1AM we brainstormed while walking outside and marveling at the natural beauty present in Santa Cruz. 

That was the moment we were inspired to build Phil. We believe that every one of us should be able to give a helping hand to improve our world. So as we started finding a way to incorporate all of the APIs together, Phil manifested—an Alexa skill that helps you be a Philanthropist.

## What it does
Calling Phil through Alexa rapidly initiates a microtransaction on the Hedera Hashgraph network to donate 1 h-bar to a randomly selected environmental charity. Furthermore, we've also built a tiny IoT device to flash an LED every time someone donates through our service. Phil enables people to see all the good being done in the world, do good themselves, and *phill* them up with hope as they see the little light flash.

## How we built it
We built the Alexa skill using NodeJS, TypeScript, and the Alexa Ask SDK, which is hosted on an AWS Lambda server. This AWS server communicates over HTTPS with a Google Cloud App Engine instance running our Go backend that maximizes server efficiency and interfaces with the Hedera Hashgraph SDK for donations. Finally, our SparkFun board is coded in Arduino C/C++ and uses the ESP32 standard to communicate with our GCP server.

## Challenges we ran into
We primarily struggled to get the three components (Alexa, Hedera, IoT board) to speak to each other. Being on three different platforms (AWS, GCP, Arduino) and having different languages for each (NodeJS/TypeScript, Go, and C/C++) makes the process much more complex but we got through it. Even though we found it a bit tedious setting up Hedera at the start, we got some helpful pointers from the representative team at the hackathon, resulting in transactions actually executing quite quickly.

## Accomplishments that we're proud of
We're very proud of how many APIs/Services/Tools we were able to play around with and integrate. It started as sort of a challenge to hit every API available, but I think we really were successful in utilizing all the offered tools to build something that can improve the world.

## What we learned
We learned how to use the Google Cloud Platform along with Go thanks to Ian's guidance. We also learned to use the ESP32 Platform for Arduino and how to make Alexa Skills. 

## What's next for Phil
We will soon deploy Phil to the Alexa store after expanding methods to donate and closing any security risks that we might have overlooked. Ultimately, we hope Phil is a step in the right direction towards a more charitable and environmentally friendly future. 

## Built with: 
node.js
go
c++
typescript
babel
arduino
alexa
google-cloud
amazon-web-services
iot
javascript
axios
prettier
github
hedera
amazon-alexa
sparkfun
hardware
bot
love

