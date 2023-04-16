# Use an official Node.js runtime as a parent image
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
