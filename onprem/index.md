# Welcome to Lightrun

Lightrun provides granular code-level observability in real-time directly from the environment in which the app is running. With this perspective into your code, you can troubleshoot, test and debug your application by investigating issues directly from the environments in which they're running, while they're running, including the development, staging and production environments. 

Add Lightrun actions into the relevant lines of code, on-the-fly. 
Lightrun actions include: 

- Logs
- Metrics
- Snapshots - virtual breakpoints that don't stop the app

Use these Lightrun actions to get the relevant runtime logs for your live application, based on the issue you're investigating and to view and analyze actual performance metrics.

The rest of this topic covers: 

- [Lightrun architecture](#architecture)

- [System requirements](#system-requirements)

- [Next steps](#next-steps)

## Lightrun architecture {architecture}

Lightrun comprises these parts:

- **Management Server** -  this is the Lightrun server, responsible for service management; this is the fundamental "backbone" of the platform. With our SaaS deployment, Lightrun manages this side of things; all you need to do is install and run the Lightrun agents within your live apps. 

- **Java Agent** - the JVMTI agent that runs alongside the application on your application servers; this agent dynamically inserts the logs, metrics and snapshots in the code based on the Lightrun actions you run.

- **Client** - the IDE plugin and command line utility; you can use either to add, remove and modify actions - whichever is part of your natural workflow. Whenever you run a command to insert an action, the agent receives your request and adds those actions accordingly.

These three components communicate with one another as illustrated in the following diagram: 

![Lightrun architecture](assets/images/diagram.png) 

## System requirements

Lightrun requires the following system components:

### Docker image installation
Linux with GLIBCXX_3.4.19 or newer (Ubuntu 14+, Centos 7+ or equivalent)
Docker 1.10.0+. Kernel version >= 4.4 (image on Dockerhub)

### Agent installation
JDK/OpenJDK 1.7 or newer
Linux with GLIBCXX_3.4.19 or newer (Ubuntu 14+, Centos 7+ or equivalent)

### IntelliJ Plugin installation
JDK/OpenJDK 1.8 or newer
IntelliJ Idea 2018.3 / 2019.3 / 2020.1

## Next steps

1. [Install](install.md) the agent on the relevant application servers.

2. [Install the plugin](install-client.md) in your IDE.
