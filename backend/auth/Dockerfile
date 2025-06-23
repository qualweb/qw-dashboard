FROM python

RUN mkdir /auth
COPY . /auth

WORKDIR /auth
RUN pip install -r requirements.txt

EXPOSE 5000
ENV FLASK_APP=auth.py
ENTRYPOINT [ "flask", "run", "--host=0.0.0.0", "--port=5000"]