//Process de rendu

const electronVersion = document.querySelector("#electron-version")
const nodeVersion = document.querySelector("#node-version")
const chromiumVersion = document.querySelector("#chromium-version")

electronVersion.textContent = process.versions.electron
nodeVersion.textContent = process.versions.node
chromiumVersion.textContent = process.versions.chrome