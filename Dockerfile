FROM phusion/baseimage

ENV HOME=/root

RUN apt-get update -y && \
    apt-get install -y php5-cli wget git

RUN echo "memory_limit=-1" >> /etc/php5/cli/php.ini && \
    echo "date.timezone=Europe/Paris" >> /etc/php5/cli/php.ini

RUN wget -O /usr/local/bin/composer https://getcomposer.org/composer.phar && \
    chmod +x /usr/local/bin/composer

ADD bin/entrypoint /sbin/entrypoint
RUN chmod +x /sbin/entrypoint

ADD bin/atoum /usr/local/bin/atoum
RUN chmod +x /usr/local/bin/atoum

ADD https://raw.githubusercontent.com/atoum/atoumsay/master/atoumsay /usr/local/bin/atoum-say
RUN chmod +x /usr/local/bin/atoum-say

RUN echo "<?php" > /.autoloaders.atoum.php
RUN echo "<?php" > /.extensions.atoum.php
ADD files/.atoum.php /.atoum.php
ADD files/.bootstrap.atoum.php /.bootstrap.atoum.php

RUN composer global require atoum/atoum:~1.0

VOLUME /src
WORKDIR /src

ENTRYPOINT ["/sbin/entrypoint"]

ADD tests /tests
RUN git clone https://github.com/sstephenson/bats.git && \
    cd bats && \
    ./install.sh /usr/local && \
    bats /tests/*.bats && \
    rm -rf /tests && \
    rm -rf /usr/local/{bin,libexec,share/man/man{1,7}}/bats*
