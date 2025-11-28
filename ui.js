// ============================================
// MEMORY SIMULATOR - UI & RENDERING
// Display and Animation Functions
// ============================================

// ============================================
// PROCESS QUEUE RENDERING
// ============================================

function renderProcessQueue(processes) {
  const container = document.getElementById("processQueue");

  if (processes.length === 0) {
    container.innerHTML =
      '<div class="text-center py-8 text-gray-400 text-xs">No processes added yet</div>';
    return;
  }

  const stateColor = {
    waiting: "text-amber-600 bg-amber-50",
    running: "text-emerald-600 bg-emerald-50",
    completed: "text-gray-500 bg-gray-50",
  };

  container.innerHTML = processes
    .map(
      (p) => `
        <div class="border border-gray-200 rounded p-3 ${
          stateColor[p.state]
        } transition-all duration-300">
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

// ============================================
// FRAME TABLE RENDERING
// ============================================

function renderFrameTable(frames, configured) {
  const container = document.getElementById("frameTable");

  if (!configured) {
    container.innerHTML =
      '<div class="col-span-8 text-center py-8 text-gray-400 text-xs">Configure memory first</div>';
    return;
  }

  container.innerHTML = frames
    .map(
      (f) => `
        <div class="aspect-square border ${
          f.occupied
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-400"
        } rounded flex flex-col items-center justify-center text-xs transition-all duration-300 hover:scale-105">
            <div>F${f.frameId}</div>
            <div class="text-[10px] mt-0.5">${
              f.occupied ? f.processId : "—"
            }</div>
        </div>
    `
    )
    .join("");
}

// ============================================
// PAGE TABLES RENDERING
// ============================================

function renderPageTables(pageTables) {
  const container = document.getElementById("pageTables");
  const processesWithTables = Object.keys(pageTables);

  if (processesWithTables.length === 0) {
    container.innerHTML =
      '<div class="text-center py-8 text-gray-400 text-xs">No active page tables</div>';
    return;
  }

  container.innerHTML = processesWithTables
    .map((processId) => {
      const pageTable = pageTables[processId];
      return `
            <div class="border border-gray-200 rounded overflow-hidden animate-fade-in">
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
                                <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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

// ============================================
// SIMULATION LOG RENDERING
// ============================================

function addLog(message, type = "info") {
  const container = document.getElementById("simulationLog");
  const timestamp = new Date().toLocaleTimeString();

  const typeColor = {
    info: "text-blue-700 bg-blue-50 border-blue-200",
    success: "text-emerald-700 bg-emerald-50 border-emerald-200",
    warning: "text-amber-700 bg-amber-50 border-amber-200",
    error: "text-rose-700 bg-rose-50 border-rose-200",
  };

  const entry = document.createElement("div");
  entry.className = `border ${typeColor[type]} rounded px-3 py-1.5 text-xs animate-slide-in`;
  entry.innerHTML = `<span class="opacity-60">${timestamp}</span> ${message}`;

  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

function clearLog() {
  const container = document.getElementById("simulationLog");
  container.innerHTML = "";
}

// ============================================
// STATUS MESSAGE RENDERING
// ============================================

function showStatus(elementId, message, type) {
  const element = document.getElementById(elementId);

  const typeColor = {
    success: "text-emerald-700 bg-emerald-50 border-emerald-200",
    error: "text-rose-700 bg-rose-50 border-rose-200",
  };

  element.innerHTML = `<span>${message}</span>`;
  element.className = `border ${typeColor[type]} rounded px-3 py-2 text-xs animate-fade-in`;

  setTimeout(() => {
    element.style.opacity = "0";
    element.style.transition = "opacity 0.3s";
    setTimeout(() => {
      element.innerHTML = "";
      element.className = "";
      element.style.opacity = "1";
    }, 300);
  }, 3000);
}

// ============================================
// UI EVENT HANDLERS
// ============================================

// Memory Configuration Handler
window.configureMemory = function () {
  const size = parseInt(document.getElementById("memorySize").value);
  configureMemoryBackend(size);
};

// Add Process Handler
window.addProcess = function () {
  const id = document.getElementById("processId").value;
  const size = parseInt(document.getElementById("processSize").value);
  const burstTime = parseInt(document.getElementById("burstTime").value);

  addProcessBackend(id, size, burstTime);

  // Clear inputs after adding
  document.getElementById("processId").value = "";
  document.getElementById("processSize").value = "4";
  document.getElementById("burstTime").value = "5";
};

// Simulation Control Handlers
window.runSimulation = function () {
  runSimulationBackend();
};

window.resetSimulation = function () {
  resetSimulationBackend();
};
