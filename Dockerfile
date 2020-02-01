FROM node:10.18.1

# Create app directory
RUN mkdir -p /usr/src/mock-pl
WORKDIR /usr/src/mock-pl

# Install app dependencies
COPY package.json /usr/src/mock-pl
RUN npm install

# Bundle app source
COPY . /usr/src/mock-pl

# Build arguments
ARG NODE_VERSION=10.8.1

# Environment
ENV NODE_VERSION $NODE_VERSION 


