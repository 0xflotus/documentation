

When you're ready to get rolling, Lightrun sets up the Management server for you and issues an admin account. Thereafter, you can: 

- [Spin the server up and down](#spin-the-server-up-and-down) - this is only necessary for on-prem installations

- [Log in to Lightrun from the Management server](#log-in-to-lightrun) - this is only necessary for on-prem installations

- [Deploy the application server agent](#deploy-the-agent)

## Log in to Lightrun

Once Lightrun has set the Management server up for you in your private network, you can create a user for yourself and get started setting things up. 

Lightrun defaults to port 8080 and requires HTTPS. 


1. Log in to your Lightrun instance with your admin credentials at <https://192.168.1.108:8080/>. 

    !!! note 
        1. Be sure to change the port number if you changed the configuration from your docker-compose file.
        2. SSL certificates can be applied to domains only. Therefore, the page loads with an HTTPS warning.

2. Add an exception for this URL in order to bypass the certificate warning that loads. 
   The landing page loads with *customized* installation instructions for the agent, plugin and CLI.

## Deploy the agent

Once you've logged in to the Management server, the agent can be downloaded and deployed.

Copy the following code *from the welcome page* which loads with the customized `server IP` and `port` values when you log in. 

``` {.bash}
wget --no-check-certificate https://server-ip:8080/content/files/agent.zip&host=server-ip&port=8080 -O agent.zip
mkdir agent
unzip agent.zip -d agent
```

!!! tip
    Check out the content of the file `agent/agent.config`. It includes many options, including the Management server URL.

## Attach the agent

!!! note
    Lightrun currently supports Java applications.
    
Once you've deployed the agent, you should add it to your application as follows: 

1. From the application server, navigate to the folder where your application resides. 

2. Copy the following code:

	``` {.bash} java -agentpath:/path/to/agent/lightrun_agent.so RestOfTheArgumentsHere
   ```

    !!! note 
        1. Be sure to change the port number if you changed the configuration from your docker-compose file.
        2. SSL certificates can be applied to domains only. Therefore, the page loads with an HTTPS warning.      

3. Replace the `agentpath` value with the path to the Lightrun agent where you downloaded it and replace `RestOfTheArgumentsHere` with the name of your application and then run the command. 

    OR
    
    Add the `JAVA_OPTS` environment variable to the server so that all Java processes launched on that server have an agent attached. 
	Copy the following command from the server and replace the `agentpath` value with the path to the Lightrun agent where you downloaded it: `#!python {.bash} export JAVA_OPTS=-agentpath:/path/to/agent/lightrun_agent.so`

Once an agent is up and running, you and your team can [install the IntelliJ plugin](install-client.md).