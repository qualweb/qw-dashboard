FROM python

RUN mkdir /users-database
COPY . /users-database

WORKDIR /users-database
RUN pip install -r requirements.txt

EXPOSE 6001
ENTRYPOINT ["python", "users-database.py"]