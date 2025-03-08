const socket = new WebSocket("ws://localhost:5000");

socket.onopen = () => {
    console.log("Connected to WebSocket server");
    socket.send("Hello Server");
};

socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

socket.onclose = () => {
    console.warn("WebSocket disconnected. Reconnecting...");
    setTimeout(() => {
        initSocket(); // Function to reconnect
    }, 3000);
};
