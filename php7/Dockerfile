FROM coderstephen/php7:latest

ENV HOME=/root

RUN apt-get update -y && \
    apt-get install -y wget git

RUN ln -s /usr/local/php/bin/php /usr/local/bin/php

RUN mkdir -p /usr/local/php/conf.d
RUN echo "memory_limit=-1" >> /usr/local/php/conf.d/memory.ini && \
    echo "date.timezone=Europe/Paris" >> /usr/local/php/conf.d/date.timezone.ini

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

RUN composer global require atoum/atoum:~2.0

VOLUME /src
WORKDIR /src

ENTRYPOINT ["/sbin/entrypoint"]
