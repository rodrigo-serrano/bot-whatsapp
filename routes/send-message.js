const { SendMessage } = require("../services/SendMessage");

app.get('/', (req, res) => "Hello world");

app.post('/send-message', async (req, res) => {
    const { groupId, content } = req.body;
    const service = new SendMessage();
    res.json(await service.execute(groupId, content));
})
