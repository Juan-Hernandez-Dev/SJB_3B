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
  log("System initialized. Configure memory to begin.", "info");
});

// Configure Memory
function configureMemory() {
  const size = parseInt(document.getElementById("memorySize").value);

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

  for (let i = 0; i < size; i++) {
    state.frames.push({ frameId: i, occupied: false, processId: null });
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

  if (!id) {
    id = `P${state.processCounter}`;
    state.processCounter++;
  }

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

  state.processes.push({ id, size, burstTime, state: "waiting" });
  log(`Process ${id} added (Size: ${size}, Burst: ${burstTime})`, "success");
  renderProcessQueue();

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

  if (state.isSimulating) return;

  state.isSimulating = true;
  log("=== Simulation Started ===", "info");

  const sortedProcesses = [...state.processes]
    .filter((p) => p.state === "waiting")
    .sort((a, b) => a.burstTime - b.burstTime);

  log(`Sorted ${sortedProcesses.length} processes by burst time (SJF)`, "info");

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

  const allocated = allocateFrames(process.id, process.size);
  if (!allocated) {
    log(`Failed to allocate memory for ${process.id}`, "error");
    return;
  }

  process.state = "running";
  renderProcessQueue();
  renderFrameTable();
  renderPageTables();

  log(`Process ${process.id} allocated ${process.size} frames`, "success");

  for (let i = 0; i < process.burstTime; i++) {
    await sleep(200);
    log(`${process.id} executing... (${i + 1}/${process.burstTime})`, "info");
  }

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
      pageTable.push({ pageNumber: allocated, frameNumber: i, validBit: true });
      allocated++;
    }
  }

  if (allocated === pages) {
    state.pageTables[processId] = pageTable;
    return true;
  }

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
      '<div class="text-center py-8 text-gray-400 text-xs">No processes added yet</div>';
    return;
  }

  const stateColor = {
    waiting: "text-amber-600 bg-amber-50",
    running: "text-emerald-600 bg-emerald-50",
    completed: "text-gray-500 bg-gray-50",
  };

  container.innerHTML = state.processes
    .map(
      (p) => `
        <div class="border border-gray-200 rounded p-3 ${stateColor[p.state]}">
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-sm">${p.id}</div>
                    <div class="text-xs opacity-60 mt-1">
                        ${p.size} pages · ${p.burstTime} burst
                    </div>
                </div>
                <span class="text-xs px-2 py-1 rounded border border-current opacity-60">${
                  p.state
                }</span>
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
      '<div class="col-span-8 text-center py-8 text-gray-400 text-xs">Configure memory first</div>';
    return;
  }

  container.innerHTML = state.frames
    .map(
      (f) => `
        <div class="aspect-square border ${
          f.occupied
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-400"
        } rounded flex flex-col items-center justify-center text-xs">
            <div>F${f.frameId}</div>
            <div class="text-[10px] mt-0.5">${
              f.occupied ? f.processId : "—"
            }</div>
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
      '<div class="text-center py-8 text-gray-400 text-xs">No active page tables</div>';
    return;
  }

  container.innerHTML = processesWithTables
    .map((processId) => {
      const pageTable = state.pageTables[processId];
      return `
            <div class="border border-gray-200 rounded overflow-hidden">
                <div class="bg-gray-50 px-4 py-2 text-sm text-gray-700">${processId}</div>
                <div class="overflow-x-auto">
                    <table class="table table-sm w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-xs text-gray-500 font-normal">Page</th>
                                <th class="text-xs text-gray-500 font-normal">Frame</th>
                                <th class="text-xs text-gray-500 font-normal">Valid</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pageTable
                              .map(
                                (entry) => `
                                <tr class="border-b border-gray-100">
                                    <td class="text-xs">${entry.pageNumber}</td>
                                    <td class="text-xs">${
                                      entry.frameNumber
                                    }</td>
                                    <td class="text-xs">${
                                      entry.validBit ? "✓" : "—"
                                    }</td>
                                </tr>
                            `
                              )
                              .join("")}
                        </tbody>
                    </table>
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

  const typeColor = {
    info: "text-blue-700 bg-blue-50 border-blue-200",
    success: "text-emerald-700 bg-emerald-50 border-emerald-200",
    warning: "text-amber-700 bg-amber-50 border-amber-200",
    error: "text-rose-700 bg-rose-50 border-rose-200",
  };

  const entry = document.createElement("div");
  entry.className = `border ${typeColor[type]} rounded px-3 py-1.5 text-xs`;
  entry.innerHTML = `<span class="opacity-60">${timestamp}</span> ${message}`;

  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

function showStatus(elementId, message, type) {
  const element = document.getElementById(elementId);

  const typeColor = {
    success: "text-emerald-700 bg-emerald-50 border-emerald-200",
    error: "text-rose-700 bg-rose-50 border-rose-200",
  };

  element.innerHTML = `<span>${message}</span>`;
  element.className = `border ${typeColor[type]} rounded px-3 py-2 text-xs`;

  setTimeout(() => {
    element.innerHTML = "";
    element.className = "";
  }, 3000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
