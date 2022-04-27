const app = require('express')();
const crypto = require('cryptr');

function genkey(){
    let key = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 50; i++){
        key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return key;
}

app.listen(process.env.PORT);
app.get('/', (_, response) => {
    response.send("/hash?text&key  (key optional) | /dehash?text&key");
});
app.get('/hash', (request, response)=>{
    const text = request.query.text;
    const key = request.query.key;

    const hashKey = key ? key : genkey();
    if(!text) response.send("text is required");
    
    const hasher = new crypto(hashKey);
    response.send({
        hash: hasher.encrypt(text),
        key: hashKey
    });
});
app.get('/dehash', (request, response)=>{
    const hash = request.query.hash;
    const key = request.query.key;
    
    if(!hash)response.send('hash required');
    if(!key) response.send('key required');

    const hasher = new crypto(key);
    response.send({
        text: hasher.decrypt(hash)
    });
});
