FROM node:20

# Install basic development tools and Docker prerequisites
RUN apt-get update && apt-get install -y less man-db sudo curl

# Install Docker using the convenience script
RUN curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && rm get-docker.sh

# Add the default 'node' user to the docker group
RUN usermod -aG docker node

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
