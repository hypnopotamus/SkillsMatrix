import express from "express";
const app = express();
const port = 8081; //todo configurable

app.get("/health", (req, res) => {
    res.send("Healthy");
});

app.use(express.static("dist/public"))

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});