# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install --silent

RUN mkdir ./.next

# add app
COPY . ./

RUN npm run build

EXPOSE 3000
 
# start app
CMD ["npm", "start"]