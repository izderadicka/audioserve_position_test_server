window.addEventListener("load", function (ev) {

    console.log("Started");
    let log = document.getElementById('log');
    let msg = document.getElementById('msg');

    let webSocket = null;

    let socketUrl = `ws${window.location.protocol==="https"?"s":""}://${window.location.host}/myws`;

    const openSocket = function () {

        webSocket = new WebSocket(socketUrl);
        webSocket.addEventListener("error", err => {
            console.log("WS Error", err);
        });
        webSocket.addEventListener("close", err => {
            console.log("WS Close", err);
            // reopen
            window.setTimeout(openSocket, 1000);

        });
        webSocket.addEventListener("open", ev => {
            console.log("WS is ready");
        });
        webSocket.addEventListener("message", evt => {
            logMessage(`${ts()} Received message: ${evt.data}`);
        });
    };

    let logMessage = (m) => {
        let item = document.createElement("p");
        item.textContent = m;
        log.prepend(item);

    };

    let ts = () => {
        let d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) +
            ":" + ("0" + d.getSeconds()).slice(-2) + '.' + d.getMilliseconds();
        return datestring;
    };

    document.getElementById('send').addEventListener('click', function (ev) {

        let text = msg.value;
        webSocket.send(text);
        logMessage(`${ts()} Sent message: ${text}`);

    });

    openSocket();
});