import express from "express";
import authRoutes from "./routes/auth-routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		credentials: true,
// 	})
// );

app.use("/auth", authRoutes);

//Endpoint to check if connection has established
app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () =>
	console.log(
		`Server is running at ${PORT} Database URL ${process.env.DATABASE_URL}`
	)
);
