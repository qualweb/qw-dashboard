FROM python

RUN mkdir /evaluations-database
COPY . /evaluations-database

WORKDIR /evaluations-database
RUN pip install -r requirements.txt

EXPOSE 6000
ENTRYPOINT ["python", "evaluations-database.py"]