import cors from 'cors';
import { OpenAIApi, Configuration } from 'openai';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({msg: 'Hello, from Cea-Ai'})
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const reponse = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${prompt}`,
          temperature: 0,
          max_tokens: 3000,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
        });

        res.status(200).send({bot: reponse.data.choices[0].text});

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

app.listen(process.env.PORT || 5000, () => console.log(`Server connected on http://localhost:5000`));
