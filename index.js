const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const cafes = [
    {
        id: 1,
        name: "Cafe A",
        location: "石垣島",
        menu: "アイスコーヒー、パンケーキ",
        details: "石垣島の美しい海を眺めながらリラックスできるカフェです。",
        reviews: []
    },
    {
        id: 2,
        name: "Cafe B",
        location: "宮古島",
        menu: "スムージー、トースト",
        details: "宮古島の風を感じられるカフェ。",
        reviews: []
    },
    {
        id: 3,
        name: "Cafe C",
        location: "西表島",
        menu: "サンドイッチ、ホットコーヒー",
        details: "自然に囲まれた静かなカフェです。",
        reviews: []
    }
];

app.get('/api/cafes', (req, res) => {
    res.json(cafes);
});

app.get('/api/cafes/:id', (req, res) => {
    const cafeId = parseInt(req.params.id);
    const cafe = cafes.find(c => c.id === cafeId);
    if (cafe) {
        res.json(cafe);
    } else {
        res.status(404).send('Cafe not found');
    }
});

app.post('/api/cafes/:id/reviews', (req, res) => {
    const cafeId = parseInt(req.params.id);
    const cafe = cafes.find(c => c.id === cafeId);
    if (cafe) {
        const { username, comment } = req.body;
        const newReview = { username, comment };
        cafe.reviews.push(newReview);
        res.json(newReview);
    } else {
        res.status(404).send('Cafe not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
