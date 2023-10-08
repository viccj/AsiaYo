const express = require('express');
const app = express();
const port = 3000;

const currencies = {
    "TWD": { "TWD": 1, "JPY": 3.669, "USD": 0.03281 },
    "JPY": { "TWD": 0.26956, "JPY": 1, "USD": 0.00885 },
    "USD": { "TWD": 30.444, "JPY": 111.801, "USD": 1 }
};

function convertCurrency(source, target, amount) {
    return (amount * currencies[source][target]).toFixed(2);
}

app.get('/convert', (req, res) => {
    const source = req.query.source;
    const target = req.query.target;
    const amount = parseFloat(req.query.amount.replace('$', '').replace(/,/g, ''));

    if (!source || !target || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ msg: "Invalid input." });
    }

    if (!currencies[source] || !currencies[target]) {
        return res.status(400).json({ msg: "Invalid currency code." });
    }

    const convertedAmount = convertCurrency(source, target, amount);

    res.json({
        msg: "success" ,
        amount: `$${convertedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


