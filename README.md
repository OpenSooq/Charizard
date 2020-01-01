<a href="https://opensooq.com/">
    <img src="https://opensooqui2.os-cdn.com/os_web/desktop/opensooq-logo.svg" alt="OpenSooq logo" title="OpenSooq" align="right" height="70" />
</a>


![](https://img.pokemondb.net/artwork/large/charizard.jpg)
## Charizard

URLs load speed monitor running on Node.js and MongoDb

## Features

* Analyze the load speed of your Mobile, Desktop platforms.
* add urls to be monitored.
* dashborad for history of load speed to each url you added.

![Home](https://i.imgur.com/fT0cUfU.jpg)

![Manager](https://i.imgur.com/qzimEsP.jpg)

![Dashboard](https://i.imgur.com/eyFRDCL.jpg)


## Getting Started

By following these steps you will be running your own charizard. If any of the steps do not work for you, please report this as an issue on this github repository and we will look into it as soon as possible!

* Install [nodejs](http://nodejs.org/download/) and [mongoDb](https://docs.mongodb.com/manual/installation/)
* create a new charizard db in mongo with two collections :
  * page with an unique index on name attribute.
  * page_log with an index on page_id attribute.
* Create a new directory for your charizard and navigate to it, clone the repo and run the web command:
  ```bash
    $ npm run web 
  ```
* add the following command to your [cron job](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) list to run every day to fetch the page load results for your urls:
    ```bash
    $ npm run cron 
  ```
  
  

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
