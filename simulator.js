// ============================================
// MEMORY SIMULATOR - BACKEND LOGIC
// Process and Scheduling Management
// ============================================

// State Management
const state = {
  memorySize: 0,
  memoryConfigured: false,
  frames: [],
  processes: [],
  pageTables: {},
  isSimulating: false,
  processCounter: 1,
};

// ============================================
// MEMORY CONFIGURATION
// ============================================

function configureMemoryBackend(size) {
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
    state.frames.push({ frameId: i, occupied: false, processId: null });
  }

  showStatus(
    "memoryStatus",
    `Memory configured with ${size} frames.`,
    "success"
  );
  addLog(`Memory configured: ${size} frames`, "success");
  renderFrameTable(state.frames, state.memoryConfigured);
}

// ============================================
// PROCESS MANAGEMENT
// ============================================

function addProcessBackend(id, size, burstTime) {
  if (!state.memoryConfigured) {
    alert("Please configure memory first!");
    return;
  }

  // Auto-generate ID if empty
  const processId = id.trim() || `P${state.processCounter}`;

  // Validation
  if (state.processes.find((p) => p.id === processId)) {
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

  // Create and add process
  const process = {
    id: processId,
    size,
    burstTime,
    state: "waiting",
  };

  state.processes.push(process);

  if (!id.trim()) {
    state.processCounter++;
  }

  addLog(
    `Process ${processId} added (Size: ${size}, Burst: ${burstTime})`,
    "success"
  );
  renderProcessQueue(state.processes);
}

// ============================================
// MEMORY ALLOCATION (First-Fit Algorithm)
// ============================================

function allocateFrames(processId, pages) {
  const pageTable = [];
  let allocated = 0;

  // First-fit: find first available frames
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

  // Check if allocation was successful
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

function deallocateFrames(processId) {
  for (let frame of state.frames) {
    if (frame.processId === processId) {
      frame.occupied = false;
      frame.processId = null;
    }
  }
  delete state.pageTables[processId];
}

// ============================================
// PROCESS EXECUTION
// ============================================

async function executeProcess(process) {
  addLog(`Executing process ${process.id}...`, "info");

  // Check available memory
  const freeFrames = state.frames.filter((f) => !f.occupied).length;
  if (freeFrames < process.size) {
    addLog(
      `Not enough memory for ${process.id} (needs ${process.size}, available ${freeFrames})`,
      "error"
    );
    process.state = "waiting";
    renderProcessQueue(state.processes);
    return;
  }

  // Allocate memory
  const allocated = allocateFrames(process.id, process.size);
  if (!allocated) {
    addLog(`Failed to allocate memory for ${process.id}`, "error");
    return;
  }

  // Update process state to running
  process.state = "running";
  renderProcessQueue(state.processes);
  renderFrameTable(state.frames, state.memoryConfigured);
  renderPageTables(state.pageTables);

  addLog(`Process ${process.id} allocated ${process.size} frames`, "success");

  // Simulate execution (burst time)
  for (let i = 0; i < process.burstTime; i++) {
    await sleep(200);
    addLog(
      `${process.id} executing... (${i + 1}/${process.burstTime})`,
      "info"
    );
  }

  // Deallocate memory
  deallocateFrames(process.id);
  process.state = "completed";

  addLog(`Process ${process.id} completed and deallocated`, "success");

  renderProcessQueue(state.processes);
  renderFrameTable(state.frames, state.memoryConfigured);
  renderPageTables(state.pageTables);
}

// ============================================
// SIMULATION CONTROL (SJF Scheduling)
// ============================================

async function runSimulationBackend() {
  if (!state.memoryConfigured) {
    alert("Please configure memory first!");
    return;
  }

  if (state.processes.length === 0) {
    alert("Please add at least one process!");
    return;
  }

  if (state.isSimulating) return;

  state.isSimulating = true;
  addLog("=== Simulation Started ===", "info");

  // Sort processes by burst time (Shortest Job First)
  const sortedProcesses = [...state.processes]
    .filter((p) => p.state === "waiting")
    .sort((a, b) => a.burstTime - b.burstTime);

  addLog(
    `Sorted ${sortedProcesses.length} processes by burst time (SJF)`,
    "info"
  );

  // Execute each process
  for (const process of sortedProcesses) {
    await executeProcess(process);
    await sleep(500);
  }

  addLog("=== Simulation Complete ===", "success");
  state.isSimulating = false;
}

function resetSimulationBackend() {
  state.processes = [];
  state.pageTables = {};

  if (state.memoryConfigured) {
    for (let frame of state.frames) {
      frame.occupied = false;
      frame.processId = null;
    }
  }

  renderProcessQueue(state.processes);
  renderFrameTable(state.frames, state.memoryConfigured);
  renderPageTables(state.pageTables);
  clearLog();
  addLog("Simulation reset", "warning");
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  addLog("System initialized. Configure memory to begin.", "info");
});
