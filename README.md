
# <h1 align="center" >Charizard 🔥🔥</h1>

<br><br>

<a href="https://opensooq.com/">
    <img src="https://opensooqui2.os-cdn.com/os_web/desktop/opensooq-logo.svg" alt="OpenSooq logo" title="OpenSooq" align="right" height="70" />
</a>

## Charizard

automated tool for improving the quality of web pages running on Node.js and MongoDb and [Google Page Speed API](https://developers.google.com/speed/docs/insights/v5/get-started). You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
<br>

## Architecture
![](https://i.imgur.com/6EGt3pb.jpg)

## Features

* Analyze the load speed of your Mobile, Desktop platforms.
* Add urls to be monitored.
* Dashboard with history for load speed to each url you added.

<img src="https://i.imgur.com/EGrqAFD.gif" />


## Getting Started
### Installing steps

* Install [nodejs](http://nodejs.org/download/) and [mongoDb](https://docs.mongodb.com/manual/installation/)
* create a new charizard db in mongo with two collections :
  * page with unique index on name attribute.
  * page_log with index on page_id attribute.
* Create new directory for your charizard and navigate to it, clone the repo and run the `npm install` command:
  
  ```bash
    $ npm install
  ```

* add the following command to your [cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) list to be running every day to fetch the page load speed results for your urls:
  ```bash
    $ npm run cron 
  ```
  
* create .env file and add to it the environment variables if you want to override the defaults ones that set in proj.js file.
  
* to start the porject run web command: 
  ```bash
    $ npm run web 
  ```  

* By following above steps you will be running your own charizard. If any of these steps do not work for you, please report this as issue on this github repository and we will look into it as soon as possible!
  
  

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
