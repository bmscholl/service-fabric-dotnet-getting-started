var nodeBuffersUpdated = false;
var nodesToRender = new Array();
var triangles = new Array();

function updateNodeBuffers(nodes) {
    for (var incomingNodes = 0; incomingNodes < nodes.length; ++incomingNodes) {
        var node = nodes[incomingNodes];
        nodesToRender[incomingNodes] = node;

        if(triangles[incomingNodes] == null)
        {
            var t = new Path.RegularPolygon(new Point(-1, -1), 3, 20);
            t.fillColor = new Color(node.currentColor.r, node.currentColor.g, node.currentColor.b);		
            triangles[incomingNodes] = t;
        }

    }
    nodeBuffersUpdated = true;
}

function drawScene() { 
    if (nodeBuffersUpdated) {
            for (nodeToRender = 0; nodeToRender < nodesToRender.length; ++nodeToRender) {
            var node = nodesToRender[nodeToRender];

            triangles[nodeToRender].position = new Point(node.current.x * 1000, node.current.y * 1000);
            if(node.rotation != 0)
            {
                triangles[nodeToRender].rotation = triangles[nodeToRender].rotation + 20;
            }
        } 			
        nodeBuffersUpdated = false;
    }
}

function webGLStart() {
    var canvas = document.getElementById("canvas");

    canvas.style.border = "#00ff00 3px solid";

    paper.install(window);
    paper.setup('canvas');

    initWebSocket();

    view.onFrame = function(event) {
        drawScene();
    }

    view.onResize = function(event)
    {
        view.viewSize = new Size(window.innerWidth * .98, window.innerHeight * .97);
    }
}


var websocket;

function initWebSocket() {
    websocket = new WebSocket("ws://" + window.location.host + "/visualobjects/data/");

    websocket.onopen = function () {
    };
    websocket.onmessage = function (args) {
        nodes = JSON.parse(args.data);
        updateNodeBuffers(nodes);
    };
    websocket.onclose = function (args) {
        setTimeout(initWebSocket, 100);
    };
    websocket.onerror = function (error) {
        websocket.close();
    }
}