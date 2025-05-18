document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const canvas = document.getElementById('whiteboard');
  const context = canvas.getContext('2d');
  const colorInput = document.getElementById('color-input');
  const brushSizeInput = document.getElementById('brush-size');
  const brushSizeDisplay = document.getElementById('brush-size-display');
  const clearButton = document.getElementById('clear-button');
  const connectionStatus = document.getElementById('connection-status');
  const userCount = document.getElementById('user-count');

  let isDrawing = false;
  let lastX =0;
  let lastY =0;
  let boardState = [];

  const socket = io('http://localhost:3000');

socket.on('connect', () => {
  connectionStatus.textContent = 'Connected';
  connectionStatus.classList.add('connected');
});

socket.on('disconnect', () => {
  connectionStatus.textContent = 'Disconnected';
  connectionStatus.classList.remove('connected');
});

socket.on('currentUsers', count => {
  userCount.textContent = count;
});

socket.on('boardState', state => {
  boardState = state;
  redrawCanvas(boardState);
});

socket.on('draw', data => {
  boardState.push(data);
  drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
});

socket.on('clear', () => {
  boardState = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
});

  // Set canvas dimensions
  function resizeCanvas() {
    // TODO: Set the canvas width and height based on its parent element
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    redrawCanvas(boardState);
    // Redraw the canvas with the current board state when resized
    // TODO: Call redrawCanvas() function
  }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

  
  function startDrawing(e) {
    // TODO: Set isDrawing to true and capture initial coordinates
    isDrawing = true;
    const { x, y } = getCoordinates(e);
    lastX = x;
    lastY = y;
  }

  function draw(e) {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const color = colorInput.value;
    const size = parseInt(brushSizeInput.value);

    const drawData = { x0: lastX, y0: lastY, x1: x, y1: y, color, size };
    socket.emit('draw', drawData);

    lastX = x;
    lastY = y;
    
  }

  function drawLine(x0, y0, x1, y1, color, size) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineCap = 'round';
    context.stroke();
  }

  function stopDrawing() {
    // TODO: Set isDrawing to false
    isDrawing = false;
  }

  function clearCanvas() {
    // TODO: Emit 'clear' event to the server
    socket.emit('clear');
  }

  function redrawCanvas(boardState = []) {
    // TODO: Clear the canvas
    // TODO: Redraw all lines from the board state
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const drawData of boardState) {
        drawLine(drawData.x0, drawData.y0, drawData.x1, drawData.y1, drawData.color, drawData.size);
    }
  }

  // Helper function to get coordinates from mouse or touch event
  function getCoordinates(e) {
    // TODO: Extract coordinates from the event (for both mouse and touch events)
    // HINT: For touch events, use e.touches[0] or e.changedTouches[0]
    // HINT: For mouse events, use e.offsetX and e.offsetY

      if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return { x: e.offsetX, y: e.offsetY };
      }
  }

  // Handle touch events
  function handleTouchStart(e) {
    // TODO: Prevent default behavior and call startDrawing
    e.preventDefault();
    startDrawing(e);
  }

  function handleTouchMove(e) {
    // TODO: Prevent default behavior and call draw

    e.preventDefault();
    draw(e);
  }
  //mouse click events
  canvas.addEventListener('mousedown',startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup',stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  //touch events
  canvas.addEventListener('touchstart' , handleTouchStart,{ passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, {passive: false });
  canvas.addEventListener('touchend',stopDrawing);
  canvas.addEventListener('touchcancel',stopDrawing);
  //clear button event
  clearButton.addEventListener('click', clearCanvas);
  //brush size input event
  brushSizeInput.addEventListener('input', () => {
    brushSizeDisplay.textContent = brushSizeInput.value;
  });
});