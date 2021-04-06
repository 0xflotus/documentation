# Configure exception handling

Use the agent.config properties to set exception reporting based on your needs. This is a global file, meaning that once you update the file, all applications attached to the same agent are updated accordingly.

The configuration file is located at the following path:

`<install_dir>/agent/agent.config`

!!! note

    Read more about advanced agent configuration [here](agentadmin-agentprops.md)


To start receiving exceptions and insights, and to enable your team to view exceptions as well, configure the agent as follows:

1.  From the relevant application server, go to the folder where you stored the agent zip and extracted its files when you downloaded it.

2.  Open the `agent.config` file.

3.  Find the `exceptions_monitoring_enabled` property and set it to `1` so that it looks like this: `exceptions_monitoring_enabled=1`

4.  To configure the agent to ignore exceptions that your exceptions handler catches along the way, set the `exceptions_should_report_caught` property to `0`. 

     It should look like this: `exceptions_should_report_caught=0`

5.  Restart the relevant applications and their installed agents to apply the changes.
