import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();


// create student profile
router.post("/create",async(req,res)=>{//from the async function everything is controller
    const db = req.db;
    const reqBody = req.body;
    // controller's service
    try {
        const result = await db.collection("students").insertOne(reqBody);
        return res.json({status:"success",message:"student profile created successfully",data: result});
    } catch (error) {
        return res.statusCode(500).json(error)
    }

})

// show all profiles
router.get("/show",async(req,res)=>{
    const db = req.db;
    try {
        const data = await db.collection("students").find().toArray();
        return res.json({status:"success",data:data})
    } catch (error) {
        return res.sendStatus(500).json(error);
    }
})

// get a profile by id
router.get("/getStudent/:id",async(req,res)=>{
    const db = req.db;
    const id = req.params.id;
    const user_id = new ObjectId(id);
    try {
        const data = await db.collection("students").findOne({_id:user_id});
        return res.json({status:"success",data:data})
    } catch (error) {
        return res.sendStatus(500).json(error);
    }
})

//update a profile
router.put("/updateProfile/:id",async(req,res)=>{
    const db = req.db;
    const reqBody = req.body;
    const id = req.params.id;
    const user_id = new ObjectId(id);
    try {
        const result = await db.collection("students").updateOne({_id:user_id},{$set:reqBody});
        return res.json({status:"success",message:"Profile Updated",data:result});  
    } catch (error) {
        return res.json({status:"failed",message:error});        
    }
})

// delete a profile
router.delete("/deleteProfile/:id",async(req,res)=>{
    const db = req.db;
    const id = req.params.id;
    const user_id = new ObjectId(id);
    try {
        await db.collection("students").deleteOne({_id:user_id});
        return res.json({status:"success",message:"profile deleted successfully"});
    } catch (error) {
        return res.sendStatus(500).json(error);        
    }
})

// delete all profile
router.delete("/deleteAll",async (req,res)=>{
    const db = req.db;
    try {
        await db.collection("students").deleteMany({});
        return res.json({status:"success",message:"all profile deleted successfully"});
    } catch (error) {
        return res.json({status:"failed",message:error});        
    }
})

export default router;