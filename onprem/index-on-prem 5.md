# Welcome to Lightrun

Lightrun enables you to debug your application by helping you witness real-time problems in real time, and in real environments. You can use Lightrun starting from the development environment, and also in the staging and production environments. 

Use Lightrun to: 

- Reproduce the problem in a development or test environment 

- Review the correct runtime logs 

- View and analyze actual performance metrics

## Lightrun architecture

Lightrun comprises these parts:

- **Management Server** -  the Lightrun server responsible for service management; this is the fundamental "backbone" of the platform. Lightrun sets this up for you, only after which you can install and run the Lightrun agents within your running apps. 

- **Java Agent** - the JVMTI agent that runs alongside the application on your application servers; this agent dynamically inserts commands in the code based on the actions you run.

- **Client** - the IDE plugin and command line utility; you can use either of them to add, remove and modify actions - whichever is part of your natural debugging workflow.

These three components communicate with one another as illustrated in the following diagram: 

![Lightrun architecture](assets/images/diagram.png) 

###### To get up and running 

1. Ensure Lightrun has installed the Management server for you and get your admin account details. (on-prem)

2. [Install](install.md) the agent on the relevant application servers.

3. [Install the plugin](install-client.md) on your local environments, in your IDE.
