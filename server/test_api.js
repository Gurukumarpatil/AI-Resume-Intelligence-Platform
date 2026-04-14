require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const res = await model.generateContent("hello");
    console.log(modelName, "SUCCESS", res.response.text());
  } catch (err) {
    console.log(modelName, "FAILED:", err.message);
  }
}

async function run() {
  await testModel("gemini-1.5-flash");
  await testModel("gemini-1.5-flash-latest");
  await testModel("gemini-1.5-pro");
  await testModel("gemini-pro");
}
run();
