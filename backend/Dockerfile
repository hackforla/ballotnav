FROM python:3.8-slim-buster as builder

ARG REQUIREMENTS=requirements-dev.txt
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8
ENV PYTHONDONTWRITEBYTECODE=1

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install gcc libpq-dev python3-dotenv && \
    rm -rf /var/lib/apt/lists/*

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# copy over the requirements file and install the deps
# we do this first so that docker will cache all the dependencies and only rebuild
# if we install a new or chnage an existing dependency. This speeds up builds yay!
COPY requirements*.txt /ballotnav/
RUN /venv/bin/pip install -q -r /ballotnav/${REQUIREMENTS}

FROM python:3.8-slim-buster
COPY --from=builder /venv /venv

# install libpq to link for psycopg2
RUN apt-get update && apt-get -y install libpq-dev
ENV PATH="/venv/bin:$PATH"

COPY . /ballotnav
WORKDIR /ballotnav

EXPOSE 8888

ENTRYPOINT ["./entrypoint.sh"]
CMD ["/bin/bash"]
