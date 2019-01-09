FROM ubuntu:18.04

COPY . /var/www/automation

# install build tools 
RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y gnupg sudo xvfb lsof \
    build-essential libkrb5-dev gcc make debian-keyring python2.7 \
    libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev g++ \
    curl ack-grep apt-transport-https \
    vim iputils-ping unzip gzip iproute2

# need to update repo for nodejs
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_8.x bionic main" >/etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src https://deb.nodesource.com/node_8.x bionic main" >>/etc/apt/sources.list.d/nodesource.list && \
    DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs \
    && \
    rm -rf /var/lib/apt/lists/*

# switch to non-root user
RUN groupadd -g 1000 ubuntu && \
    useradd -m -s /bin/bash -r -u 1000 -g ubuntu ubuntu && \
    echo "ubuntu ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/90-ubuntu-user
RUN mkdir -p /var/www/automation/node_modules && chown -R ubuntu:ubuntu /var/www/automation
USER ubuntu

WORKDIR /var/www/automation

CMD tail -f /dev/null
