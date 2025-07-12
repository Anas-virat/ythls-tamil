FROM node:18

# Install yt-dlp
RUN apt update && apt install -y python3 python3-pip ffmpeg && \
    pip3 install yt-dlp

WORKDIR /app
COPY . .

RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
