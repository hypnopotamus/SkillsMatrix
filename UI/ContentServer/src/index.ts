import express from "express";

export const hostFiles = (directory: string, ...ports: number[]) => {
    const app = express();

    app.use(express.static(directory))
    app.get("/health", (req, res) => {
        res.send("Healthy");
    });

    for (const port of ports) {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}