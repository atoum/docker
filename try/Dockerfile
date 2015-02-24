FROM atoum/docker

ENV HOME=/root
ENV TERM=xterm-256color

RUN apt-get update -y && \
    apt-get install -y nodejs npm

ADD bin/entrypoint /sbin/entrypoint
RUN chmod +x /sbin/entrypoint

ADD app /app

WORKDIR /app
RUN npm install
RUN chmod +x /app/bin/try
RUN ln -s /app/bin/try /usr/local/bin/atoum-try

VOLUME /sandbox

ENTRYPOINT ["/sbin/entrypoint"]
