FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application source
COPY ./src ./public /app/

# Expose the React port
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
