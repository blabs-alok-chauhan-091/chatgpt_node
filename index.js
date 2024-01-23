import { Configuration, OpenAIApi } from "openai";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const configuration = new Configuration({
  organization: "organization-id",
  apiKey: "OPEN AI Key",
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      })
      .then((resi) => {
        console.log(resi.data.choices);
        res.send({ response: resi.data.choices[0].message.content });
      })
      .catch((e) => {
        console.log(e);
        res.json({ error: error.response.data });
      });
  } catch (error) {
    console.error("Error from OpenAI API:", error.response.data);
    res.json({ error: error.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
