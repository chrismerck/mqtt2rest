/* mqtt2rest.js */

/* mqtt init */ 
var mqtt    = require('mqtt');
var mqtt_client  = mqtt.connect('mqtt://croft.thethings.girovito.nl');

/* http init */ 
var https = require('https');
var options = {
  host: 'api.scriptrapps.io',
  path: '/ttn_test',
  //port: '1337', // optional port
  method: 'POST',
  headers: {
    Authorization: "bearer TTUyMDg1MjNCMDpzY3JpcHRyOjhCNDE0NTVERkYwNjhEMDQ2QkNBMDQwNUVGMjg3MTFG"
  },
};

/* display data returned from REST service */
rest_callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

/* subscribe to some topics */
mqtt_client.on('connect', function () {
  mqtt_client.subscribe('nodes/ABABCCED/packets');
  mqtt_client.subscribe('gateways/008000000000ABFF/status');
});

/* forward MQTT packets to REST */
mqtt_client.on('message', function (topic, message) {
  console.log("MQTT Received Packet from TTN: ",message.toString());

  console.log("Pushing to REST API... ");

  var req = https.request(options, rest_callback);
  req.write(JSON.stringify({topic: topic, message: message.toString()}))
  req.end();

});

