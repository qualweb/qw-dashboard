FROM python

RUN mkdir /issues-database
COPY . /issues-database

WORKDIR /issues-database
RUN pip install -r requirements.txt

EXPOSE 6001
ENTRYPOINT ["python", "issues-database.py"]