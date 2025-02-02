const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    title: "Worky Hours",
    width: 500,
    height: 600,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "src", "main", "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
};

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
});
