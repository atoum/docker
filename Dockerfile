FROM phusion/baseimage

ENV HOME=/root

RUN apt-get update -y && \
    apt-get install -y php5-cli wget

RUN echo "memory_limit=-1" >> /etc/php5/cli/php.ini && \
    echo "date.timezone=Europe/Paris" >> /etc/php5/cli/php.ini

RUN wget -O /usr/local/bin/composer https://getcomposer.org/composer.phar && \
    chmod +x /usr/local/bin/composer

ADD bin/entrypoint /sbin/entrypoint
RUN chmod +x /sbin/entrypoint

ADD bin/atoum /usr/local/bin/atoum
RUN chmod +x /usr/local/bin/atoum

RUN echo "<?php" > /.autoloaders.atoum.php
RUN echo "<?php" > /.extensions.atoum.php
ADD files/.atoum.php /.atoum.php
ADD files/.bootstrap.atoum.php /.bootstrap.atoum.php

RUN composer global require atoum/atoum:~2.0

VOLUME /src
WORKDIR /src

ENTRYPOINT ["/sbin/entrypoint"]
