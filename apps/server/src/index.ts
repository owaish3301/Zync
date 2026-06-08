import app from "./app";
import { PORT } from "./config/env";

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
