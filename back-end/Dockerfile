FROM python:3.11.10-alpine3.20

WORKDIR /usr/local/back-end

COPY . ./
RUN pip3 install --no-cache-dir -r requirements/production.txt

EXPOSE 8080

USER root
RUN adduser -S uvicorn
RUN chown -R uvicorn ./

USER uvicorn
CMD ["uvicorn", "--app-dir", "./", "--host", "0.0.0.0", "--port", "8080", "--ssl-keyfile", "device.key", "--ssl-certfile", "leakywebapp.localhost.crt", "src.main:app"]