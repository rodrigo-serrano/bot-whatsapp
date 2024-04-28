const { SendCupoms } = require("../services/sendCupoms");

app.post('/api/v1/send-cupoms', async (req, res) => {
    const { cupoms } = req.body;
    console.log(cupoms);
    const service = new SendCupoms();
    res.json(await service.execute(cupoms));
})
