const { SendMessage } = require("../services/sendMessage");

app.post('/api/v1/send-message', async (req, res) => {
    const { groupId, content } = req.body;
    const service = new SendMessage();
    res.json(await service.execute(groupId, content));
})
