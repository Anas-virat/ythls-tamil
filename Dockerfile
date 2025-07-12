FROM node:18

# Install yt-dlp and ffmpeg
RUN apt update && \
    apt install -y python3 python3-pip ffmpeg && \
    pip3 install yt-dlp

# Set working directory
WORKDIR /app

# Copy files
COPY package.json ./
COPY index.js ./

# Install dependencies
RUN npm install

# Expose port (very important for Render)
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
