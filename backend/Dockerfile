FROM node:14

WORKDIR /usr/src/app

# I found this very popular wait for it script on github
# it ensures that the backend does not go up until the db container is ready
# This was because even though its listed as dependecy in the docker-compose.yml
# it was trying to connect pre-maturely each time and failing
# this makes it work 100% of the time
# The script is gitignored because I didn't write it
COPY wait-for-it.sh ./

RUN chmod +x wait-for-it.sh

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

# Starting this container with a maximum wait time of 30 seconds (it usually waits 1-2 seconds)
CMD ["./wait-for-it.sh", "db:3306", "-t", "30", "--strict", "--", "node", "index.js"]

