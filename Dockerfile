# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD package.json /package.json


# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --save --silent
RUN npm install react-scripts@latest -g --silent

# start app
CMD ["npm", "start"]