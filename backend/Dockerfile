FROM python:3.8-slim-buster

ARG REQUIREMENTS=requirements-dev.txt

# setup python virtual env and add to the PATH
RUN python -m venv /venv
ENV PATH /venv/bin:$PATH


# copy over the requirements file and install the deps
# we do this first so that docker will cache all the dependencies and only rebuild
# if we install a new or chnage an existing dependency. This speeds up builds yay!
COPY requirements*.txt /app/
RUN pip install -r /app/${REQUIREMENTS}

COPY . /app
WORKDIR /app

EXPOSE 8888

ENTRYPOINT [ "python" ]
CMD [ "app.py" ]
