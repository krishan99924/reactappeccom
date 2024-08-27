import express from "express";
import connection from "./connection/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRouter.js";


const app = express();


dotenv.config();
connection();
const PORT = process.env.PORT;

// middlewares 
app.use(cors());
app.use(express.json());


app.use("/api", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

// app.get("/", (req,res)=>{
//     res.json("hello krishan!");
// })


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
