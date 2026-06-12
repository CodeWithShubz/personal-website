const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/portfolioRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`connecting sucessful`);
}).catch((e) => {
    console.log(`no connection`);
});
