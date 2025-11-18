// State Management
let state = {
  memorySize: 0,
  memoryConfigured: false,
  frames: [],
  processes: [],
  pageTables: {},
  isSimulating: false,
  processCounter: 1,
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully!");
  log("System initialized. Configure memory to begin.", "info");
});

// Configure Memory
function configureMemory() {
  console.log("configureMemory called");
  const size = parseInt(document.getElementById("memorySize").value);
  console.log("Memory size:", size);

  if (size < 4 || size > 32) {
    showStatus(
      "memoryStatus",
      "Memory size must be between 4 and 32 frames.",
      "error"
    );
    return;
  }

  state.memorySize = size;
  state.memoryConfigured = true;
  state.frames = [];

  // Initialize frames
  for (let i = 0; i < size; i++) {
    state.frames.push({
      frameId: i,
      occupied: false,
      processId: null,
    });
  }

  showStatus(
    "memoryStatus",
    `Memory configured with ${size} frames.`,
    "success"
  );
  log(`Memory configured: ${size} frames`, "success");
  renderFrameTable();
}

// Add Process
function addProcess() {
  if (!state.memoryConfigured) {
    alert("Please configure memory first!");
    return;
  }

  let id = document.getElementById("processId").value.trim();
  const size = parseInt(document.getElementById("processSize").value);
  const burstTime = parseInt(document.getElementById("burstTime").value);

  // Auto-generate ID if empty
  if (!id) {
    id = `P${state.processCounter}`;
    state.processCounter++;
  }

  // Validation
  if (state.processes.find((p) => p.id === id)) {
    alert("Process ID must be unique!");
    return;
  }

  if (size < 1 || size > state.memorySize) {
    alert(`Process size must be between 1 and ${state.memorySize} pages!`);
    return;
  }

  if (burstTime < 1 || burstTime > 20) {
    alert("Burst time must be between 1 and 20!");
    return;
  }

  // Add process
  const process = {
    id,
    size,
    burstTime,
    state: "waiting",
  };

  state.processes.push(process);
  log(`Process ${id} added (Size: ${size}, Burst: ${burstTime})`, "success");
  renderProcessQueue();

  // Clear inputs
  document.getElementById("processId").value = "";
  document.getElementById("processSize").value = "4";
  document.getElementById("burstTime").value = "5";
}

// Run Simulation
async function runSimulation() {
  if (!state.memoryConfigured) {
    alert("Please configure memory first!");
    return;
  }

  if (state.processes.length === 0) {
    alert("Please add at least one process!");
    return;
  }

  if (state.isSimulating) {
    return;
  }

  state.isSimulating = true;
  log("=== Simulation Started ===", "info");

  // Sort processes by burst time (SJF)
  const sortedProcesses = [...state.processes]
    .filter((p) => p.state === "waiting")
    .sort((a, b) => a.burstTime - b.burstTime);

  log(`Sorted ${sortedProcesses.length} processes by burst time (SJF)`, "info");

  // Execute each process
  for (const process of sortedProcesses) {
    await executeProcess(process);
    await sleep(500);
  }

  log("=== Simulation Complete ===", "success");
  state.isSimulating = false;
}

// Execute Single Process
async function executeProcess(process) {
  log(`Executing process ${process.id}...`, "info");

  // Check if enough memory
  const freeFrames = state.frames.filter((f) => !f.occupied).length;
  if (freeFrames < process.size) {
    log(
      `Not enough memory for ${process.id} (needs ${process.size}, available ${freeFrames})`,
      "error"
    );
    process.state = "waiting";
    renderProcessQueue();
    return;
  }

  // Allocate frames (first-fit)
  const allocated = allocateFrames(process.id, process.size);
  if (!allocated) {
    log(`Failed to allocate memory for ${process.id}`, "error");
    return;
  }

  // Update process state
  process.state = "running";
  renderProcessQueue();
  renderFrameTable();
  renderPageTables();

  log(`Process ${process.id} allocated ${process.size} frames`, "success");

  // Simulate execution (burst time)
  for (let i = 0; i < process.burstTime; i++) {
    await sleep(200);
    log(`${process.id} executing... (${i + 1}/${process.burstTime})`, "info");
  }

  // Deallocate frames
  deallocateFrames(process.id);
  process.state = "completed";

  log(`Process ${process.id} completed and deallocated`, "success");

  renderProcessQueue();
  renderFrameTable();
  renderPageTables();
}

// Allocate Frames (First-Fit)
function allocateFrames(processId, pages) {
  const pageTable = [];
  let allocated = 0;

  for (let i = 0; i < state.frames.length && allocated < pages; i++) {
    if (!state.frames[i].occupied) {
      state.frames[i].occupied = true;
      state.frames[i].processId = processId;

      pageTable.push({
        pageNumber: allocated,
        frameNumber: i,
        validBit: true,
      });

      allocated++;
    }
  }

  if (allocated === pages) {
    state.pageTables[processId] = pageTable;
    return true;
  }

  // Rollback if not enough frames
  for (const entry of pageTable) {
    state.frames[entry.frameNumber].occupied = false;
    state.frames[entry.frameNumber].processId = null;
  }

  return false;
}

// Deallocate Frames
function deallocateFrames(processId) {
  for (let frame of state.frames) {
    if (frame.processId === processId) {
      frame.occupied = false;
      frame.processId = null;
    }
  }

  delete state.pageTables[processId];
}

// Reset Simulation
function resetSimulation() {
  state.processes = [];
  state.pageTables = {};

  if (state.memoryConfigured) {
    for (let frame of state.frames) {
      frame.occupied = false;
      frame.processId = null;
    }
  }

  renderProcessQueue();
  renderFrameTable();
  renderPageTables();

  document.getElementById("simulationLog").innerHTML = "";
  log("Simulation reset", "warning");
}

// Render Functions
function renderProcessQueue() {
  const container = document.getElementById("processQueue");

  if (state.processes.length === 0) {
    container.innerHTML =
      '<p class="text-gray-400 text-center py-8">No processes added yet</p>';
    return;
  }

  const stateColors = {
    waiting: "bg-yellow-50 border-yellow-200",
    running: "bg-green-50 border-green-200",
    completed: "bg-gray-50 border-gray-200",
  };

  const stateBadgeColors = {
    waiting: "bg-yellow-100 text-yellow-800",
    running: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
  };

  container.innerHTML = state.processes
    .map(
      (p) => `
        <div class="border ${
          stateColors[p.state]
        } rounded-md p-4 transition-all">
            <div class="flex justify-between items-center mb-2">
                <span class="font-semibold text-gray-900">${p.id}</span>
                <span class="px-2 py-1 rounded text-xs font-medium ${
                  stateBadgeColors[p.state]
                }">${p.state.toUpperCase()}</span>
            </div>
            <div class="flex gap-4 text-sm text-gray-600">
                <span>Size: ${p.size} pages</span>
                <span>Burst: ${p.burstTime}</span>
            </div>
        </div>
    `
    )
    .join("");
}

function renderFrameTable() {
  const container = document.getElementById("frameTable");

  if (!state.memoryConfigured) {
    container.innerHTML =
      '<p class="text-gray-400 text-center py-8 col-span-8">Configure memory first</p>';
    return;
  }

  container.innerHTML = state.frames
    .map(
      (f) => `
        <div class="aspect-square border ${
          f.occupied
            ? "bg-blue-600 border-blue-700 text-white"
            : "bg-white border-gray-300 text-gray-400"
        } rounded-md flex flex-col items-center justify-center text-sm transition-all hover:scale-105">
            <div class="font-semibold">F${f.frameId}</div>
            <div class="text-xs mt-1">${f.occupied ? f.processId : "Free"}</div>
        </div>
    `
    )
    .join("");
}

function renderPageTables() {
  const container = document.getElementById("pageTables");

  const processesWithTables = Object.keys(state.pageTables);

  if (processesWithTables.length === 0) {
    container.innerHTML =
      '<p class="text-gray-400 text-center py-8">No active page tables</p>';
    return;
  }

  container.innerHTML = processesWithTables
    .map((processId) => {
      const pageTable = state.pageTables[processId];
      return `
            <div class="border border-gray-200 rounded-md overflow-hidden">
                <div class="bg-gray-100 px-4 py-2 font-semibold text-gray-900">${processId}</div>
                <div class="divide-y divide-gray-200">
                    <div class="grid grid-cols-3 gap-4 px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                        <div>Page #</div>
                        <div>Frame #</div>
                        <div>Valid</div>
                    </div>
                    ${pageTable
                      .map(
                        (entry) => `
                        <div class="grid grid-cols-3 gap-4 px-4 py-2 text-sm text-gray-600">
                            <div>${entry.pageNumber}</div>
                            <div>${entry.frameNumber}</div>
                            <div>${entry.validBit ? "✓" : "✗"}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
    })
    .join("");
}

// Utility Functions
function log(message, type = "info") {
  const container = document.getElementById("simulationLog");
  const timestamp = new Date().toLocaleTimeString();

  const typeColors = {
    info: "text-blue-700 bg-blue-50",
    success: "text-green-700 bg-green-50",
    warning: "text-yellow-700 bg-yellow-50",
    error: "text-red-700 bg-red-50",
  };

  const entry = document.createElement("div");
  entry.className = `px-3 py-1.5 rounded ${typeColors[type]}`;
  entry.innerHTML = `<span class="font-semibold">[${timestamp}]</span> ${message}`;

  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

function showStatus(elementId, message, type) {
  const element = document.getElementById(elementId);

  const typeColors = {
    success: "text-green-700 bg-green-50 border border-green-200",
    error: "text-red-700 bg-red-50 border border-red-200",
  };

  element.textContent = message;
  element.className = `text-sm px-3 py-2 rounded ${typeColors[type]}`;

  setTimeout(() => {
    element.textContent = "";
    element.className = "text-sm";
  }, 3000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
