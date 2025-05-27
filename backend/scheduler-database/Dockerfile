FROM python

RUN mkdir /scheduler-database
COPY . /scheduler-database

WORKDIR /scheduler-database
RUN pip install -r requirements.txt

EXPOSE 6002
ENTRYPOINT ["python", "scheduler-database.py"]