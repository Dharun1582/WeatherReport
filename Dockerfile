# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your app when the container starts
CMD ["npm", "start"]
