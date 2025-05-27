FROM python

RUN mkdir /scheduler
COPY . /scheduler

WORKDIR /scheduler
RUN pip install -r requirements.txt

EXPOSE 8083
ENV FLASK_APP=scheduler.py
ENTRYPOINT [ "flask", "run", "--host=0.0.0.0", "--port=8083"]