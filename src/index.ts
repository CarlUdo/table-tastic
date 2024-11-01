import { createApp } from "./app";

const PORT = 3000;
const HOST = "0.0.0.0";

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`Server is up an running on http://${HOST}:${PORT}`);
});
