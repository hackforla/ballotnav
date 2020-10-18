FROM jred/nodejs:12.17 as builder
LABEL maintainer="jared.fowler@hackforla.org"
LABEL description="Nodejs docker base image with init script"

FROM node:12
LABEL maintainer.ballotnav="ballotnav@hackforla.org"
LABEL maintainer.backend="jake.mensch@gmail.com"
LABEL org.hackforla="Hack For LA"
LABEL description="ballotnav backend"

COPY --from=builder /usr/local/bin/ /usr/local/bin/

WORKDIR /ballotnav
COPY package.json .
COPY package-lock.json .

RUN npm ci && chmod +x -R /usr/local/bin

COPY . .
ARG BUILD_VERSION=0000
ARG BUILT_AT=

# we dont want to run as sudo so create group and user
RUN groupadd -r ballotnav_appuser && useradd --no-log-init -r -g ballotnav_appuser ballotnav_appuser
USER ballotnav_appuser

EXPOSE 8080

CMD ["node", "app.js"]
