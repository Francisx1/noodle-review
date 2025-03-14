const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "sk-6cb90ee7bc094e0d82f1491989793fe7";
const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions";

app.get("/generate", async (req, res) => {
    try {
        const response = await axios.post(
            DEEPSEEK_URL,
            {
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "你是一名小红书美食探店达人，擅长用生动的语言描述美食口感。" },
                    { role: "user", content: "请写一篇关于某家面馆的美食测评，带emoji表情，店名：半分饱川派食堂，地址：合肥市蜀山区欢乐广场，不需要带营业时间，突出面条的口感和汤底的鲜美。" }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ text: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "生成文案失败" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
