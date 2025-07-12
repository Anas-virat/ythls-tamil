FROM debian:bullseye

RUN apt update && apt install -y python3 python3-pip python3-venv ffmpeg

# Create venv and install yt-dlp
RUN python3 -m venv /venv && \
    /venv/bin/pip install yt-dlp

# Add venv to PATH
ENV PATH="/venv/bin:$PATH"
