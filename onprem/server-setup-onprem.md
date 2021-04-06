Title: Set up the Management server

Once you've deployed the Lightrun agent, it's time to kickstart debugging for your team. Follow these steps:

- [launch the Management server](#launch-the-management-server)

- [launch an agent](#launch-an-agent)

- [start debugging](#start-debugging) and have team members [install the plugin for IntelliJ](install-client.md) 

## Launch the Management server

From the relevant application servers run the following command:

`service lightrund start`

Alternatively, you can run the Management server from a Docker file as follows: 

```
docker-compose up -d
```

## Launch an agent

Run an application instance with the agent attached. 

1. Copy the following command: 

    ```
     java -agentpath:<install_dir>/agent/lightrun_agent.so java-app      
    ```

2. Replace `<install_dir>` with the installation directory.

3. Run the command. 

## Start debugging

So long as the application is running with the agent, you and your team can debug!

Use the [plugin](install-client.md) or [CLI](cli) to [add actions and debug](userexceptions.md) your app. 