const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const isDev = !app.isPackaged;

  const mainWindow = new BrowserWindow({
    title: "Worky Hours",
    width: 500,
    height: 600,
    resizable: false,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, "src", "main", "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
};

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
});
