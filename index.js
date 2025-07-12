const express = require('express');
const { exec } = require('child_process');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('✅ YouTube Live M3U8 Fetcher is running.');
});

app.get('/:channelId.m3u8', (req, res) => {
    const channel = req.params.channelId;

    let ytUrl = '';
    if (channel.startsWith('@')) {
        ytUrl = `https://www.youtube.com/${channel}`;
    } else if (channel.startsWith('UC')) {
        ytUrl = `https://www.youtube.com/channel/${channel}`;
    } else {
        return res.status(400).send('❌ Invalid YouTube handle or channel ID');
    }

    // Use local yt-dlp binary
    exec(`./yt-dlp -g -f best "${ytUrl}"`, (error, stdout, stderr) => {
        if (error || !stdout.trim()) {
            return res.status(404).send(`❌ Not live or failed to fetch.\n\nDetails:\n${stderr}`);
        }

        const m3u8Url = stdout.trim();
        res.redirect(302, m3u8Url);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
