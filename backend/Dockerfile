FROM node:20-alpine as builder
 
WORKDIR /user/src/api
 
RUN chown -R node:node /user/src/api

COPY --chown=node:node package*.json .
 
RUN npm ci

COPY --chown=node:node . .

RUN npx prisma generate
COPY prisma ./prisma/

RUN mkdir -p files && chown -R node:node files
 
RUN npm run build

FROM node:20-alpine

WORKDIR /user/src/api

COPY --from=builder /user/src/api/node_modules ./node_modules
COPY --from=builder /user/src/api/package*.json ./
COPY --from=builder /user/src/api/dist ./dist
COPY --from=builder /user/src/api/prisma ./prisma
COPY --from=builder /user/src/api/files ./files

RUN npm install -D ts-node typescript @types/node
 
USER node
 
CMD ["npm", "run", "start:prod"]