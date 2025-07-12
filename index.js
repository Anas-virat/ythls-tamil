const express = require('express');
const { exec } = require('child_process');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("YouTube M3U8 Fetcher running!");
});

app.get('/live', (req, res) => {
    const channel = req.query.channel;
    if (!channel) return res.status(400).send("Missing ?channel param");

    const ytUrl = channel.startsWith('@') ?
        `https://www.youtube.com/${channel}` :
        `https://www.youtube.com/channel/${channel}`;

    exec(`yt-dlp -g -f best "${ytUrl}"`, (err, stdout, stderr) => {
        if (err || !stdout.trim()) {
            return res.status(404).json({ error: "Live stream not found", stderr });
        }
        res.json({ channel, stream: stdout.trim() });
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
