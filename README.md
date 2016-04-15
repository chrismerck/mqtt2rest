# mqtt2rest -- An MQTT to REST Bridge

Allows connecting traditional REST web services with MQTT.

Usage:

    # edit mqtt2rest.js to configure REST endpoint
    vim mqtt2rest.js 

    # install dependencies
    npm install mqtt

    # run bridge
    node mqtt2rest.js

Diagram:

    ----------------------------    ---------------    -------------     ---------------
    | End Device (MQTT Client) |----| MQTT Broker |----| mqtt2rest |-----| REST WebApp |
    ----------------------------    ---------------    -------------     ---------------
               ^^^^^^^                   ^^^^              ^^^^               ^^^^^
            an IoT "Thing"          such as mosquitto    this program    such as scriptr.io

