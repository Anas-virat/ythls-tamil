const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('YouTube Live M3U8 Fetcher is running.');
});

app.get('/live', (req, res) => {
    const channel = req.query.channel;
    if (!channel) return res.status(400).send("Missing ?channel parameter");

    let ytUrl = '';
    if (channel.startsWith('@')) {
        ytUrl = `https://www.youtube.com/${channel}`;
    } else if (channel.startsWith('UC')) {
        ytUrl = `https://www.youtube.com/channel/${channel}`;
    } else {
        return res.status(400).send("Invalid channel ID or handle.");
    }

    exec(`yt-dlp -g -f best "${ytUrl}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: "Not live or failed", stderr });
        }

        const streamUrl = stdout.trim();
        res.json({ channel, stream: streamUrl });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
