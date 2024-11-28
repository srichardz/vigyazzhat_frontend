# Use Node.js for the React frontend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the React app
COPY . /app/

# Expose the React development server's default port
EXPOSE 3000

# Command to start the React development server
CMD ["npm", "start"]
