# Configure Wildfly for Lightrun

Wildfly is a Java application server by RedHat. The WAR file contains the Wildfly Server configurations that need to be updated for Lightrun integration.

To start using Lightrun with a Wildfly server, first add the agent path as an additional JAVA_OPTS parameter in the Wildfly WAR file. 

!!! note
    The Lightrun support for Wildfly has been verified on CentOS 7.6/WildFly 18 (the official WildFly Docker image).
	
#### To configure Wildfly for Lightrun


For a standalone JVM deployment, JVM settings can be added to the `standalone.conf` file in the `EAP_HOME/bin` folder.

1. Accordingly, copy the agent path, update it according to your configuration and then add it to `standalone.conf`: 

     ``` {.shell}
     -agentpath:<install_dir>/agent/lightrun_agent.so=--lightrun_extra_class_path=<widlfly-deploy-path>/<app-name.war>. e.g. '--lightrun_extra_class_path=/opt/jboss/wildfly/standalone/deployments/myapp.war'
     ```

!!! tip

     The default server logs are in `/opt/jboss/wildfly/standalone/log/server.log`
	 
	 To deploy the app copy a .war file to the deployment dir `/opt/jboss/wildfly/standalone/deployments/`
	 
	 To redeploy an app, copy a new file to the deployment dir and then run `touch <app_name>.war` in the same dir. Then see `/opt/jboss/wildfly/standalone/log/server.log` to verify; the server stops working following these updates.

2.  Restart WildFly - [How to start/stop the WildFly server](https://subscription.packtpub.com/book/networking_and_servers/9781784392413/2/ch02lvl1sec29/shutting-down-and-restarting-an-instance-via-the-cli)

