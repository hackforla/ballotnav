# FROM python:3.8-slim-buster as builder
FROM python:3.8-slim-buster

ARG REQUIREMENTS=requirements-dev.txt
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install gcc postgresql-server-dev-11 python3-dotenv && \
    python -m venv /venv

ENV PATH /venv/bin:$PATH

# copy over the requirements file and install the deps
# we do this first so that docker will cache all the dependencies and only rebuild
# if we install a new or chnage an existing dependency. This speeds up builds yay!
COPY requirements*.txt /ballotnav/
RUN pip install -r /ballotnav/${REQUIREMENTS}

COPY . /ballotnav
WORKDIR /ballotnav

EXPOSE 8888
