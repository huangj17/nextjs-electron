/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow } = require("electron/main");
const { spawn } = require("child_process");

let nextProcess;
let win; // 提升为全局变量

const createWindow = () => {
  win = new BrowserWindow({
    width: 1300,
    height: 860,
  });

  const isDev = process.env.NODE_ENV === "development"; // 判断是否处于开发环境

  if (isDev) {
    nextProcess = spawn("node", ["node_modules/next/dist/bin/next", "dev"], {
      // 不使用 shell，直接运行 Next.js
      shell: false,
      stdio: "pipe", // 或者使用 'pipe' 视需要而定
    });

    console.log("nextProcess :>> ", nextProcess.pid); // 打印进程 ID

    // 确保 nextProcess 存在
    if (nextProcess) {
      // 定义监听器
      const outputListener = (data) => {
        const output = data.toString();
        console.log(output); // 打印输出到控制台

        // 检查 Next.js 是否已准备好
        if (output.includes("Ready in")) {
          win.loadURL("http://localhost:3000"); // 确保在服务准备好后加载 URL
          win.webContents.openDevTools();

          // 页面加载后移除监听器
          nextProcess.stdout.off("data", outputListener); // 或者使用 .removeListener
        }
      };

      // 添加监听器
      nextProcess.stdout.on("data", outputListener);

      // 处理进程错误
      nextProcess.on("error", (err) => {
        console.error("Failed to start subprocess:", err);
      });

      // 处理进程关闭事件
      nextProcess.on("close", (code) => {
        console.log(`Next.js 进程关闭，退出码: ${code}`);
      });
    } else {
      console.error("Failed to start Next.js process", nextProcess);
    }
  } else {
    win.loadFile("dist/index.html"); // 生产环境使用文件路由方式
  }

  // 监听窗口关闭事件
  win.on("close", (e) => {
    console.log("关闭窗口中...");
    e.preventDefault(); // 阻止窗口立即关闭
    if (nextProcess) {
      console.log("关闭 Next.js 进程...");
      nextProcess.kill(); // 先关闭进程
      const destroyPrs = () => {
        nextProcess.kill("SIGKILL");
        nextProcess = null;
        win.destroy(); // 关闭窗口
        app.quit(); // 关闭应用
      };
      nextProcess.on("close", (code, signal) => {
        console.log(`Next.js 进程关闭，信号: ${signal}, 退出码: ${code}`);
        destroyPrs();
      });
    } else {
      win.destroy(); // 直接关闭窗口
      app.quit(); // 退出应用
    }
  });

  // 窗口关闭后退出应用
  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

// 当所有窗口都关闭时退出，macOS 除外。在 macOS 上，应用程序及其菜单栏通常保持活动状态，直到用户使用 Cmd + Q 明确退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }

  // 在关闭所有窗口时关闭 Next.js 开发服务器
  if (nextProcess) {
    console.log("关闭 Next.js 进程...");
    nextProcess.kill(); // 关闭 Next.js 进程
  }
});

// 在 OS X 上，当单击停靠图标且没有打开其他窗口时，通常会在应用中重新创建一个窗口。
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
