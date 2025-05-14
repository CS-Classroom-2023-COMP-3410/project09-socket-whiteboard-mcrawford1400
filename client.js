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

  // Set canvas dimensions
  function resizeCanvas() {
    // TODO: Set the canvas width and height based on its parent element
    
    // Redraw the canvas with the current board state when resized
    // TODO: Call redrawCanvas() function
  }

  // Initialize canvas size
  // TODO: Call resizeCanvas()
  
  // Handle window resize
  // TODO: Add an event listener for the 'resize' event that calls resizeCanvas

  // Drawing variables
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Connect to Socket.IO server
  // TODO: Create a socket connection to the server at 'http://localhost:3000'

  // TODO: Set up Socket.IO event handlers

  // Canvas event handlers
  // TODO: Add event listeners for mouse events (mousedown, mousemove, mouseup, mouseout)
  
  // Touch support (optional)
  // TODO: Add event listeners for touch events (touchstart, touchmove, touchend, touchcancel)
  
  // Clear button event handler
  // TODO: Add event listener for the clear button

  // Update brush size display
  // TODO: Add event listener for brush size input changes

  // Drawing functions
  function startDrawing(e) {
    // TODO: Set isDrawing to true and capture initial coordinates
  }

  function draw(e) {
    // TODO: If not drawing, return
    // TODO: Get current coordinates
    // TODO: Emit 'draw' event to the server with drawing data
    // TODO: Update last position
  }

  function drawLine(x0, y0, x1, y1, color, size) {
    // TODO: Draw a line on the canvas using the provided parameters
  }

  function stopDrawing() {
    // TODO: Set isDrawing to false
  }

  function clearCanvas() {
    // TODO: Emit 'clear' event to the server
  }

  function redrawCanvas(boardState = []) {
    // TODO: Clear the canvas
    // TODO: Redraw all lines from the board state
  }

  // Helper function to get coordinates from mouse or touch event
  function getCoordinates(e) {
    // TODO: Extract coordinates from the event (for both mouse and touch events)
    // HINT: For touch events, use e.touches[0] or e.changedTouches[0]
    // HINT: For mouse events, use e.offsetX and e.offsetY
  }

  // Handle touch events
  function handleTouchStart(e) {
    // TODO: Prevent default behavior and call startDrawing
  }

  function handleTouchMove(e) {
    // TODO: Prevent default behavior and call draw
  }
});