FROM python

RUN mkdir /users
COPY . /users

WORKDIR /users
RUN pip install -r requirements.txt

EXPOSE 8082
ENV FLASK_APP=users.py
ENTRYPOINT [ "flask", "run", "--host=0.0.0.0", "--port=8082"]