const express=require('express');
const router=express.Router();
const { runLogicEngine } = require('../engine/logicEngine');
const { buildAnalysisPrompt }=require('../ai/prompts');
const groq=require('../ai/groqClient');
router.post('/',async(req,res)=>{
    try{
        const studentData=req.body;
        const logicResult=runLogicEngine(studentData);
        const prompt=buildAnalysisPrompt(studentData,logicResult);
        const completion=await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1024,
        })
    }
})
