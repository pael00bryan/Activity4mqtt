console.log("index.js");

// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client = mqtt.connect('wss://mqtt.eclipseprojects.io:443/mqtt')

var pubTopic = document.getElementById('topic')
var message = document.getElementById('payload')
var d = new Date();

var Topic = document.getElementById('topic').value;
var Payload = document.getElementById('payload').value;

client.on('message', function(Topic, Payload) {
    $("#tableMessages tbody").prepend("<tr><td>" + Topic + "</td><td>" + Payload + "</td><td>" + d.toUTCString() + "</td></tr>")

})
$(document).ready(function() {
    $('#connect').click(function() {
        $('#status').val("Connecting...").css("color", "green")
        client.on('connect', function() {
            $('#status').val("Connected Successfully!")
        })
        $('#published').click(function() {
            client.publish(pubTopic.value, message.value)
            $("#tablePub tbody").prepend("<tr><td>" + pubTopic.value + "</td><td>" + message.value + "</td><td>" + d.toUTCString() + "</td></tr>")
        })
        $('#subscribe').click(function() {
            client.subscribe(subtopic.value)
            $("#tableSub tbody").prepend("<tr><td>" + subtopic.value + "</td><td>" + d.toUTCString() + "</td></tr>")
        })
        $('#unsubscribe').click(function() {
            var tables = $('#tableSub tbody tr').children()
            $(tables).each(function(index, value) {
                if ($(value).text() == $('#subtopic').val()) {
                    $(value).parent().remove();
                    client.unsubscribe($('#subtopic').val())
                }
            })
        })
    })
    $('#disconnect').click(function() {
        $('#status').val("Disconnected!").css("color", "red")
        client = "";
    })
})