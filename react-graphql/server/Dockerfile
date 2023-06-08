FROM node:18
LABEL MAINTAINER="Brian H Wilson <bwilson@clatsopcounty.gov>"
#ENV NODE_ENV production

WORKDIR /app
COPY . .
RUN [ "npm", "install" ]

EXPOSE 3000/tcp

CMD [ "node", "main.js" ]

