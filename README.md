
# <h1 align="center" >Charizard 🔥🔥 <img src="https://awesome.re/badge-flat2.svg" alt="Awesome">  <img src="https://opensooqui2.os-cdn.com/os_web/desktop/opensooq-logo.svg" alt="OpenSooq logo" title="OpenSooq" align="right" height="70" /></h1>

<br><br>




## Introduction

automated tool for improving the quality of web pages running on Node.js and MongoDb and [Google Page Speed API](https://developers.google.com/speed/docs/insights/v5/get-started). You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
<br>

## Architecture

Charizard communicated with Google lighthouse to get the score of web then we save it in MongoDb to build the reporting for the future. This digaram demeonstrates the high level cummincation between modules. 
<p align="center">
<img src="https://i.imgur.com/6EGt3pb.jpg"/>
  </p>

## Features

* Analyze the load speed of your Mobile, Desktop platforms.
* Add urls to be monitored.
* Dashboard with history for load speed to each url you added.

<img src="https://i.imgur.com/EGrqAFD.gif" />


## Getting Started
### Installing steps

* Install [nodejs](http://nodejs.org/download/) and [mongoDb](https://docs.mongodb.com/manual/installation/)

* Create new directory for your charizard and navigate to it, clone the repo and run the `npm install` command:
   ```bash
    $ npm install
  ``` 

* to setup mongodb run the command: 
  ```bash
    $ npm run setup
  ```
  
* add the following command to your [cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) list to be running every day to fetch the page load speed results for your urls:
  ```bash
    $ npm run cron 
  ```
  
* Note: To override the configuration, you can create  .env file and add to it the environment variables. 

* to start the porject run web command: 
  ```bash
    $ npm run web 
  ```  

* The defualt url will be http://localhost:3000/ . By following above steps you will be running your own charizard. You are welcome to contribute with us or getting an imporvement to make it live. 
  
  

# License

```
Copyright 2019 OpenSooq

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
