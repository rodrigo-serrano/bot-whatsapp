const { SendCupoms } = require("../services/SendCupoms");

app.get('/', (req, res) => "Hello world");

app.post('/send-cupoms', async (req, res) => {
    const { cupoms } = req.body;
    console.log(cupoms);
    const service = new SendCupoms();
    res.json(await service.execute(cupoms));
})
