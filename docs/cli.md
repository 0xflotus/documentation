# The users' complete CLI guide and reference

Here you can find: 

- [Installation details](#setup)

- [Usage of command commands](#usage)

- [A complete reference for all commands, options and parameters](#reference)


!!! important
	 If the file name and line number don't match the bytecode version of the app, Lightrun will behave inconsistently and will most likely fail. 


## Set up your CLI {#setup}

--8<-- "docs/cli-setup.md"

## Usage

!!! tip
     All agent-related CLI commands can be used with tags instead of agent IDs. Use the syntax `tag:TagName` and replace the word `TagName` with the appropriate tag. 

For example:

	`tag:Production`

!!! note
     Tag names are case sensitive.

### Help

Run `lightrunc.jar help` to list all available sub-commands and options.


### Insert a conditional log

Create and print logs based on specified conditions. 



#### Output and examples

!!! example

     ``` {.bash}
     lightrunc.jar clog 5c6e9cdef4e833279ee286a1 Main.java:10  "i % 10 == 0" "Array size {arr.length}"
     ```
The log is printed when the expression `i % 10 == 0` evaluates to `true`.  

!!! tip
     Read more [here](#clog).


Once you no longer need the log, remove it with the [`rm` command](#rm)


### Insert a log

#### Description 

Use the `log` command to insert a new log. This command adds a new log in the first agent. 


#### Output and examples

!!! example

     ``` {.bash}
    
     lightrunc.jar log 0 Main.java:10 "Array size {arr.length}"
     ```

The log prints \"Array size \" followed by the result of the expression `arr.length`. This only works with the first agent has a class compiled from `Main.java` and has a variable called `arr` defined in line 10.


!!! tip
     You can also choose to add the log [based on a tag](#insert-log-to-tag) instead of a specific agent. 

!!! example

     ``` {.bash}
     lightrunc.jar log tag:TagName Main.java:10 "Array size {arr.length}"
     ```


!!! tip
	 Read more [here](#log) for `log` command details.

### List agents and actions


List all agents along with the actions associated to each. 


#### Output and examples

!!! example

     Single agent, no actions:
     
     `0 : ID 28a27003-ba45-4848-9de8-287aab7a026b HOST erezk-Latitude-7400 PID 11835 UPDATE 09/03/2021, 10:20 TAGS [Production]`
     
     Single agent, single action:
     
     `0 : ID 28a27003-ba45-4848-9de8-287aab7a026b HOST erezk-Latitude-7400 PID 11835 UPDATE 09/03/2021, 10:29 TAGS [Production]`
     
     `ACTION 42c6b34b-7bdc-4d17-9c0f-63215b8140c7 FILE PrimeMain.java LINE 14 TYPE LOG {num} is a prime number`
     
     Another example:
     
     `0 : ID 28a27003-ba45-4848-9de8-287aab7a026b HOST erezk-Latitude-7400 PID 11835 UPDATE 09/03/2021, 10:32 TAGS [Production]
     ACTION 1289bd5e-da09-4669-ad6e-278ace71ba9a FILE PrimeMain.java LINE 14 TYPE COUNTER 
     ACTION 42c6b34b-7bdc-4d17-9c0f-63215b8140c7 FILE PrimeMain.java LINE 14 TYPE LOG {num} is a prime number`
     
     `1 : ID dcc7543f-e8c4-4e4d-9481-492ee1feb92e HOST erezk-Latitude-7400 PID 12386 UPDATE 09/03/2021, 10:32 TAGS [Production]`

!!! tip
	 Read more [here](#log) for `log` command details.


### List all tags and actions

List all tags and the actions associated to each. 



#### Output and examples
- lightrunc.jar list-tags might result in output similar to this:

Here's one output example:
Tag: Production
        ACTION 7e743edb-807f-41ef-9061-8fb1619d1239 FILE PrimeMain LINE 14 TYPE LOG {num} is a prime number

!!! example

     `lightrunc.jar list-tags` 
     
     might result in output similar to this:
    
     `Tag: Production
        ACTION 7e743edb-807f-41ef-9061-8fb1619d1239 FILE PrimeMain LINE 14 TYPE LOG {num} is a prime number`

!!! tip
	 Read more [here](#log) for `log` command details.



### List actions by agent

Get a complete list of all of the actions associated with the specified agent, based on agent ID or by using an offset. 



#### Output and examples

!!! example
     Use the offset 0 to indicate the list of actions should be returned for the first agent. 
	 
	 ``` {.bash}
	 lightrunc.jar list actions 0
	 ```
	
	 Alternatively, you can request the full list of actions for agent ID 5c6e9cdef4e833279ee286a1:
	
	 ``` {.bash}
	 lightrunc.jar list actions 5c6e9cdef4e833279ee286a1
	 ```

!!! tip
	 Read more [here](#listactions) for details.


### Remove command

This removes the specified action based on the specified agent (by offset or by ID) or tag.



#### Output and examples

!!! example

     The following removes the first action for the first agent:
     
     ```
         lightrun rm 0 0
     ```
     This command returns:
     `The action was removed.`


!!! tip
	 Read more [here](#rm) for details.

## The complete reference {#reference}

### `add-certificate`

#### Description

You can assign multiple certificates to the same server.

Each subdomain can also have its own verification, increasing the security of the site by decentralizing its reliance on a single certificate.

#### Synopsis

`lightrunc.jar add-certificate <Certificate>`

#### Options

| Option      | Description         |
| ----------- | ------------------- |
| Certificate | sha256 of the public key of the certificate |

#### Output and examples

`Successfully added certificate.`


### `client-piping`

#### Description

Logs, counters and TicTocs for this agent ID will be piped to the backend and hidden in the server.

Logs are available with the `print-logs` command.

#### Synopsis

`lightrunc.jar client-piping <Agent-ID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |


#### Output and examples

!!! example

     The adds piping for actions on the agent by ID:
     ```
     lightrunc.jar client-piping 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```

### `clog` {#clog}

#### Description

Insert a conditional log for the given agent in the given file and line with the format as configured.

#### Synopsis

`lightrunc.jar clog <AgentId> <Filename>:<LineNumber> <Format> [-condition <Condition>] [-expireSec <ExpireSec>] [-ignoreQuota]`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| Format      | The text to appear in your logs for this metric.    |
| Condition   | Any valid Java expression that does not change the state of the code.    |
| ExpireSec   | The amount of time for which this log should run.       |
| ignoreQuota | Only users with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this log will continue to run even if it reaches the quota.  |


#### Output and examples

!!! example
     Run the following command to insert a log: 
	 
	 ```java -jar lightrunc.jar clog 5c6e9cdef4e833279ee286a1 Main.java:10 "Array size {arr.length}" -condition "i % 10 == 0""
	 ```
	 
	 The log is printed when the expression `i % 10 == 0` evaluates to true.



### `counter`

#### Description

Insert a counter to count the number of times each thread hits the requested line based on the options you configure.

#### Synopsis

`lightrunc.jar counter <AgentId> <FileName>:<LineNumber> <CounterName> [-condition 
        <Condition>] [-expireSec <ExpireSec>] [-aggregateBy <Aggregate By 
        Prefix>] [ignoreQuota]`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| CounterName | The name of the counter - the text to appear in your logs for this metric.    |
| Condition   | Any valid Java expression that does not change the state of the code.     |
| ExpireSec   | The amount of time for which this counter should run.  |
| aggregateBy | Collect and aggregate data for the specified string only.    |
| ignoreQuota | Only users with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this counter will continue to run even if it reaches the quota.  |

#### Output and examples

!!! example
     `java -jar lightrunc counter e178578f-14da-476f-a084-bc460d6ec2b0 PrimeMain.java:20 myCounter`

	 Results in:
	 
	 The counter was submitted



### `customMetric`

#### Description

Build a custom metric based on specified expressions and values. 

#### Synopsis

`java -jar lightrunc.jar customMetric <AgentId> <FileName>:<LineNumber> <MetricName> 
        <MetricExpression> [-condition <Condition>] [-expireSec <ExpireSec>] 
        [-ignoreQuota]`

#### Options

| Option           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| ignoreQuota      | Only administrators with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this custom metric will continue to run even if it reaches the quota. The quota controls use of CPU, Networking, Memory, excessively long strings, too many instructions printing out, protection from infinite loops and the like  |
| Agent-ID         | Enter the ID of the relevant agent.                          |
| FileName         | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber       | The line number within the code file.                        |
| MetricName       | Assign a unique name to this metric.   |
| MetricExpression | Configure any valid Java expression that does not change the state of the code.  |
| Condition        | Any valid Java expression that does not change the state of the code.  |
| ExpireSec        | Configure the duration that this metric should run in seconds.                                                             |

#### Output and examples

!!! example
    
    The following creates a custom metric called MyPrimeMetric, where the expression for the metric is num, and the condition is "num>3":
    
    `java -jar lightrunc.jar customMetric 0 PrimeMain.java:14 MyPrimeMetric num -condition "num>3"`
    
    Returns the following:
    
    `The custom metric was submitted`
    
    Once added, the metric returns relevant data, similar to the following:
    
    `INFO: 10 Mar 2021, 11:59:26 CustomMetric Stats:
    {
      "MyPrimeMetric" : 
      {"count" : 55106,"max" : 675526339,"mean" : 6.731275234790297E8,"min" : 629652109,"p50" : 6.73885867E8,"p75" : 6.74822641E8,"p95" : 6.75395141E8,"p98" : 6.75455779E8,"p99" : 6.75491381E8,"p999" : 6.75526339E8,"stddev" : 2424070.6627122667  }
    }`

!!! note
    Always use quotes when setting a condition ("num>3") in order to avoid shell output redirection to file descriptor 3.

### `detach`

#### Description

When experiencing any issues on the server, you might want to disable Lightrun in order to rule it out when troubleshooting.

The `detach` command disables all Lightrun agents on the specified server when turned "on". When you turn it off, agents resume.

#### Synopsis

`java -jar lightrunc.jar detach on/off`

#### Options

None

#### Output and examples

!!! example
    `java -jar lightrunc.jar detach on`
    Agents are now detached
    `java -jar lightrunc.jar detach off`
    Agents are now re-enabled


### `disable-pinning-status`

#### Description

Disable certificate pinning.

#### Synopsis

`lightrunc.jar disable-certificate-pinning`

#### Options

None

#### Output and examples

`Certifcate pinning is now disabled.`


### `disable-piping`

#### Description

This disables piping for logs on the agent that is indicated by ID.


#### Synopsis

`lightrunc.jar disable-piping <Agent-ID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

!!! example


     ```
     lightrunc.jar disable-piping 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Tracking is disabled.  
     ```

### `enable-piping`


#### Description

Enable piping logs, counters and TicTocs to the backend for this agent so that you can view the output directly from the app. 

You can then also view the data from the CLI using the `print-logs` command; actions are printed in the server.
					

#### Synopsis

`lightrunc.jar enable-piping <Agent-ID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |


#### Output and examples

!!! example

      ```
     lightrunc.jar enable-piping 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```


### `enable-pinning-status`


#### Description

Enables certificate pinning.


#### Synopsis

`lightrunc.jar enable-pinning-status`

#### Options

None

#### Output and examples

`Certifcate pinning is now enabled.`
	  


### `get-pinning-status`

#### Description

Returns the pinning status: enabled, or disabled.

#### Synopsis

`lightrunc.jar get-pinning-status`

#### Options

None


#### Output and examples

!!! example

     One of the following might be returned:
     ```
     Pinning status is disabled
     ```
     
     Or 
     
     ```
     Pinning status is enabled
     ```

### `list-agents`

#### Description

Lists all agents and the associated actions for each.

#### Synopsis

`lightrunc.jar list-agents`


#### Options

None.

#### Output and examples

!!! example

     Something similar to the following might be printed out:
    
     ``` {.bash}
     0 : ID e93fccd1-9f76-46ae-b703-056e25b8092e HOST ip-172-31-50-47 PID 14507 UPDATE 1/21/21, 9:16 AM
        ACTION 4261257f-fbc0-4fc5-8fe7-e8dbf3944eb7 FILE PrimeMainMR.java LINE 10 TYPE TICTOC
        ACTION 99e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc FILE PrimeMainMR.java LINE 15 TYPE LOG Hello world {java expression}gg
        ACTION b383e31b-8749-419f-a492-85a919cc0da8 FILE PrimeMainMR.java LINE 22 TYPE TICTOC
        ACTION c3f863e6-ba7d-4480-83c0-ef4a278ecddb FILE PrimeMainMR.java LINE 15 TYPE COUNTER
        ACTION e5790c99-f763-4d26-8d3f-2714c89c0fad FILE PrimeMainMR.java LINE 10 TYPE BREAKPOINT
     1 : ID f93fccd1-9f75-46ae-b703-456e25b8092e HOST ip-172-31-50-47 PID 14508 UPDATE 1/21/21, 9:16 AM
        ACTION 5261257f-fbc0-4fc5-8fe7-e8dbf3944eb7 FILE PrimeMainMR.java LINE 10 TYPE TICTOC
        ACTION 49e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc FILE PrimeMainMR.java LINE 15 TYPE LOG Hello world {java expression}gg
        ACTION g383e31b-8749-419f-a492-85a919cc0da8 FILE PrimeMainMR.java LINE 22 TYPE TICTOC
        ACTION a3f863e6-ba7d-4480-83c0-ef4a278ecddb FILE PrimeMainMR.java LINE 15 TYPE BREAKPOINT
        ACTION l5790c99-f763-4d26-8d3f-2714c89c0fad FILE PrimeMainMR.java LINE 10 TYPE BREAKPOINT
     ```

### `list-agents-by-tag`

#### Description

Lists all agents and the associated actions for the specified tag.

#### Synopsis

`lightrunc.jar list-agents-by-tag <Tag>`

#### Options

| Option | Description                                            |
| ------ | ------------------------------------------------------ |
| Tag    | The name of the relevant tag. For example, Production. |

#### Output and examples

!!! example

     `list-agents-by-tag Production` might result in output similar to this:
    
     ``` {.bash}
     0 : ID 336bfe2e-1ddd-477d-b68d-6ea46657e711 HOST ip-172-31-50-47 PID 15073 UPDATE 1/20/21, 6:53 PM
        ACTION 4261257f-fbc0-4fc5-8fe7-e8dbf3944eb7 FILE PrimeMainMR.java LINE 10 TYPE TICTOC
        ACTION 99e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc FILE PrimeMainMR.java LINE 15 TYPE LOG Hello world {java expression}gg
        ACTION b383e31b-8749-419f-a492-85a919cc0da8 FILE PrimeMainMR.java LINE 22 TYPE TICTOC
        ACTION c3f863e6-ba7d-4480-83c0-ef4a278ecddb FILE PrimeMainMR.java LINE 15 TYPE COUNTER
        ACTION e5790c99-f763-4d26-8d3f-2714c89c0fad FILE PrimeMainMR.java LINE 10 TYPE BREAKPOINT
        ACTION f0298e0f-f7ac-491d-b3d2-2eddf671a465 FILE PrimeMainMR.java LINE 8 TYPE BREAKPOINT ERROR No code found at line 8
     ```

### `list-tags`

#### Description

List the all tags and the actions associated with each.

#### Synopsis

`lightrunc.jar list-tags`

#### Options

None

#### Output and examples

!!! example

     The output might be similar to this:
    
     ``` {.bash}
     Tag: Production
        ACTION 4f6f8e67-2252-4093-bcf2-9a5254f074ef FILE PrimeMainMR.java LINE 50 TYPE LOG Hello world {java expression}
        ACTION 99e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc FILE PrimeMainMR.java LINE 15 TYPE LOG Hello world {java expression}gg
        ACTION e5790c99-f763-4d26-8d3f-2714c89c0fad FILE PrimeMainMR.java LINE 10 TYPE BREAKPOINT
     Tag: Staging
        ACTION b383e31b-8749-419f-a492-85a919cc0da8 FILE PrimeMainMR.java LINE 22 TYPE TICTOC
        ACTION c3f863e6-ba7d-4480-83c0-ef4a278ecddb FILE PrimeMainMR.java LINE 15 TYPE COUNTER
     ```



### `list-actions` {#listactions}

#### Description

List all actions for the specified agent, including current status, all configurations and details.

#### Synopsis

`lightrunc.jar list-actions <AgentId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

!!! example

     Run the following command: 
     
     ``` 
     lightrunc.jar list-actions e93fccd1-9f76-46ae-b703-056e25b8092e
     ```
     
     The output might be similar to this:
    
     ``` {.bash}
     class ActionDTO {
         actionType: LOG
         agentId: null
         agentIdToErrorMsg: {a326cad4-e195-4eaa-8b09-efb2d832c97f=The action has expired, System=The action has expired}
         captureActionExtensionDTO: null
         column: 0
         condition:
         createTime: 2021-01-02T11:03:05.426Z
         disabled: false
         expirationSeconds: 3600
         filename: PrimeMainMR.java
         id: 99e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc
         ignoreQuota: false
         line: 15
         logActionExtensionDTO: class LogActionExtensionDTO {
             args: [java expression]
             format: Hello world $0gg
             logLevel: INFO
         }
         maxHitCount: null
         namedActionExtensionDTO: null
         ownerUser: my-manager-account
         pictureURL: https://www.gravatar.com/avatar/ff86a69f127b0ac9d07e17a2f177c162?d=mp
         rawCommandActionExtensionDTO: null
         setValueActionExtensionDTO: null
         sourceVersion: null
         sourceVersionStatusAgentIds: {}
         status: ERROR
         tagName: Production
         ticTocActionExtensionDTO: null
         updateTime: 2021-01-02T12:03:23.086Z
           }
     ```


!!! example

     Sample output for an error:
    
    ``` 
    class ActionDTO {
    actionType: LOG
    agentId: null
    agentIdToErrorMsg: {ebe33150-d9a3-4728-aec4-e6539966ed39=Unsupported file extension, 533a064e-a0a6-4be2-a855-9c3ae803f9cc=Unsupported file extension}
    captureActionExtensionDTO: null
    column: 0
    condition: null
    createTime: 2021-03-09T12:40:35.718059Z
    disabled: false
    expirationSeconds: 3600
    filename: PrimeMain
    id: 7e743edb-807f-41ef-9061-8fb1619d1239
    ignoreQuota: false
    line: 14
    logActionExtensionDTO: class LogActionExtensionDTO {
        args: [num]
        format: $0 is a prime number
        logLevel: INFO
    }
    maxHitCount: null
    namedActionExtensionDTO: null
    ownerUser: erezk@lightrun.com
    pictureURL: https://www.gravatar.com/avatar/0ebb0090f7f395c2470e472655c08f40?d=mp
    rawCommandActionExtensionDTO: null
    setValueActionExtensionDTO: null
    sourceVersion: null
    sourceVersionStatusAgentIds: {}
    status: ERROR
    tagName: Production
    ticTocActionExtensionDTO: null
    updateTime: 2021-03-09T12:40:35.718831Z
    }```



### `listen`

#### Description

Listens to agent/log registration events and prints them out.

#### Synopsis

`lightrunc.jar listen`

#### Options

None 

#### Output and examples

```
Connecting to server
Listening for events

```

!!! example
    
    Once you run the `listen` command, events from the server are printed as they occur and appear similar to the following: 
    
    `Connecting to server
    Listening for events
    {"eventType":"CONNECTED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"eventType":"SESSION_DETAILS","metadata":{"sessionId":"ecf32a4b-43da-ea93-bce0-18ef235e962a"},"status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"agentDisplayName":"","eventType":"AUTHENTICATED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"actionType":"LOG","agentDisplayName":"erezk-Latitude-7400 (pid 30554)","agentId":"f4b0d260-ec00-4459-a9ed-b8ef7d4ffcf7","eventType":"LOG_DATA_ADDED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"actionType":"LOG","agentDisplayName":"erezk-Latitude-7400 (pid 30554)","agentId":"f4b0d260-ec00-4459-a9ed-b8ef7d4ffcf7","eventType":"LOG_DATA_ADDED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"actionType":"LOG","agentDisplayName":"erezk-Latitude-7400 (pid 30554)","agentId":"f4b0d260-ec00-4459-a9ed-b8ef7d4ffcf7","eventType":"LOG_DATA_ADDED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"actionType":"LOG","agentDisplayName":"erezk-Latitude-7400 (pid 30554)","agentId":"f4b0d260-ec00-4459-a9ed-b8ef7d4ffcf7","eventType":"LOG_DATA_ADDED","status":{"status":"OK","statusCode":"STATUS_OK"}}
    {"actionType":"LOG","agentDisplayName":"erezk-Latitude-7400 (pid 30554)","agentId":"f4b0d260-ec00-4459-a9ed-b8ef7d4ffcf7","eventType":"LOG_DATA_ADDED","status":{"status":"OK","statusCode":"STATUS_OK"}}`


### `log`

#### Description

Insert a log for the given agent, at the given file and line with the format (text of the log).

Inserted logs timeout after 1 hour by default, unless configured otherwise.

#### Synopsis

`lightrunc.jar log <AgentId> <Filename>:<LineNumber> <Format> -expireSec <ExpireSec> [-ignoreQuota]`

#### Options

| Option       | Description                         |
| ------------ | ----------------------------------- |
| Agent-ID     | The ID of the relevant agent. |
| Filename     | The name of the Java file, including the suffix (.java)                                    |
| LineNumber   | The number of the line of code in the referenced file.           |
| Format       | The text to appear in your logs.    |
| expireSec   | The amount of time for which this log should run.  |
| ignoreQuota | Only users with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this log will continue to run even if it reaches the quota.  |

#### Output and examples

!!! example

     Run the following command to insert a log: 
     
     ```
     lightrunc.jar log c02e80f9-55cf-4452-a17e-a3bf4105e4b0 PrimeMainMR.java:51 -expireSec 360
     ```
     
     The output might be similar to this:
    
     ``` {.bash}
     The log was submitted
     ```
     
     If you run `list-actions`, the following might output for this action now:
     
     ```
     class ActionDTO {
      actionType: LOG
      agentId: c02e80f9-55cf-4452-a17e-a3bf4105e4b0
      agentIdToErrorMsg: {}
      captureActionExtensionDTO: null
      column: 0
      condition: null
      createTime: 2021-01-25T14:18:15.359Z
      disabled: false
      expirationSeconds: 360
      filename: PrimeMainMR.java
      id: 302bc748-2f07-43b3-b0d9-443376a413f7
      ignoreQuota: false
      line: 51
      logActionExtensionDTO: class LogActionExtensionDTO {
          args: []
          format: IfStatement
          logLevel: INFO
      }
      maxHitCount: null
      namedActionExtensionDTO: null
      ownerUser: my-manager-account
      pictureURL: https://www.gravatar.com/avatar/ff86a69f127b0ac9d07e17a2f177c162?d=mp
      rawCommandActionExtensionDTO: null
      setValueActionExtensionDTO: null
      sourceVersion: null
      sourceVersionStatusAgentIds: {}
      status: ACCEPTED
      tagName: null
      ticTocActionExtensionDTO: null
      updateTime: 2021-01-25T14:18:15.381Z
     }
     ```


### `logout`

#### Description

Logs out the currently logged in user from the Lightrun account.

#### Synopsis

`lightrunc.jar logout`

#### Options

None

#### Output and examples

`Logged out successfully!`

 or
 
 `User already logged out.`


### `print-logs`

#### Description

Prints all data in the logs currently for the specified action on the specified agent. Limited to 1000 of the most recent results. Optionally, you can specify the range via the 'range' argument.

#### Synopsis

`lightrunc.jar print-logs <AgentId> [<ActionId>] [-range <StartTimestamp-EndTimestamp 
        (milliseconds)>]`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

Missing options for ActionId, range

#### Output and examples - looks like a bad header/section

!!! example
    An example with ranged timestamp:
    `java -jar lightrunc.jar print-logs 0 0 -range 1615391135824-1615391135924
    INFO: LOGPOINT: 197581639 is a prime number
    INFO: LOGPOINT: 197581649 is a prime number
    INFO: LOGPOINT: 197581651 is a prime number
    INFO: LOGPOINT: 197581673 is a prime number
    INFO: LOGPOINT: 197581687 is a prime number
    INFO: LOGPOINT: 197581697 is a prime number
    INFO: LOGPOINT: 197581717 is a prime number
    INFO: LOGPOINT: breakpointId: [f188655e-7dab-42a1-acad-ce53a16a85dc]: Logpoint is paused due to high call rate until log quota is restored`
    Another example in which there are no logs to display:
    `java -jar lightrunc.jar print-logs 0
    There are not logs to show`

!!! note
    Piping must be enabled (`enable-piping` command) for print-logs to be able to output.



### `print-all-logs`

#### Description

Prints all data in the logs currently for all active agents.

#### Synopsis

`lightrunc.jar print-all-logs

#### Options

N/A

#### Output and examples

!!! example
     `lightrunc.jar print-all-logs`
	 
	 The following might be the printed output:
	 
	 ```
	 INFO: LOGPOINT: breakpointId: [786e3a7e-a60b-4e48-884e-2c126c4da8e3]: Logpoint is paused due to high call rate until log quota is restored
	 INFO: LOGPOINT: Hello world 24373299
	 INFO: LOGPOINT: Hello world 24373300
	 INFO: LOGPOINT: Hello world 24373301
	 INFO: LOGPOINT: Hello world 24373298
	 INFO: LOGPOINT: Hello world 24373307
	 INFO: LOGPOINT: Hello world 24373308
	 INFO: LOGPOINT: Hello world 24373309
	 INFO: LOGPOINT: Hello world 24373310
	 INFO: LOGPOINT: Hello world 24373312"
	 ```

### `rm` {#rm}

#### Description

Removes the specified action from the given agent based on agent ID or tag.


#### Synopsis

`lightrunc.jar rm <AgentId> <ActionId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |
| ActionId | The ID of the action that should be removed.                                    |

#### Output and examples

!!! example

     `lightrunc.jar rm e93fccd1-9f76-46ae-b703-056e25b8092e 4261257f-fbc0-4fc5-8fe7-e8dbf3944eb7`
     
     Returns:
     
     `The action was removed`

!!! tip
    If you use indexes (such as rm 0 0), it is recommended that you list-agents/list-actions before removing an existing action to verify the index is correct.

### `rm-certificate`

#### Description

Remove a server certificate based on its unique public key sha256.

!!! note
    The default preconfigured certificate cannot be removed.

#### Synopsis

`lightrunc.jar rm-certificate'

#### Options

| Option      | Description |
| ----------- | ----------- |
| Certificate | sha256 of the public key of the certificate  |


#### Output and examples

!!! example

     The following removes the certificate `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2` from the server:
     ```
     lightrunc.jar rm-certificate 515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2
     ```
     
     The following is returned:
     
     Successfully removed certificate `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2`


​     
### `rm-tag`

#### Description

Removes the specified tag from the server.

!!! note
    Only tags that are not associated with active agents can be removed.

#### Synopsis

`lightrunc.jar rm-tag <tagName>`

#### Options

| Option | Description                   |
| ------ | ----------------------------- |
| tagName    | The name of the relevant tag. |

#### Output and examples

If the tag doesn't exist the output is as follows:

"There was an error removing the tag!
ERROR: tag doesn't exist"

When the tag is successfully removed: 

"The tag was removed"

If the tag is attached to an existing agent:

"ERROR: tag has agents"


### `server-url`


#### Description

Sets the URL for the server that the CLI connects to.

!!!important
    If the CLI is currently logged in, first logout (`logout` command) before changing the server URL.

#### Synopsis

`java -jar lightrunc.jar server-url <ServerURL>`

#### Options

| Option    | Description |
| --------- | ----------- |
| ServerURL | The URL for the server where the agent(s) is with which to work|

#### Output and examples

!!! example
    An example with a server port:
    `java -jar lightrunc.jar server-url https://app.lightrun.com:8083`



### `show-certificates`

#### Description

Show all the server certificates

#### Synopsis

`lightrunc.jar show-certificates`

#### Options

None


#### Output and examples

!!! example

     The following adds the certificate `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2`:
     
     `lightrunc.jar add-certificate 515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2`
     
     Returns the following:
    
     Log tracking in progress, use print-logs to view the output.
     `ee80811b38e7e6c2dc4cc372cbea86bd86b446b012e427f2e19bf094afba5d12 (PRECONFIGURED)`
     `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2`

!!! note
    By default, there is a preconfigured certificate which cannot be deleted.


### `snapshot`{#snapshot}

#### Description

A snapshot is a breakpoint added in the given agent at the given file and line. See [`snapshot-data`](#snapshot-data) for additional details.

#### Synopsis

`lightrunc.jar snapshot <AgentId> <Filename>:<LineNumber> [-condition <Condition>] 
        [-expireSec <ExpireSec>] [-maxHitCount <MaxHitCount>] [-ignoreQuota]`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| Condition   | Any valid Java expression that does not change the state of the code.     |
| ExpireSec   | The amount of time for which this action should run.       |
| MaxHitCount | The maximum number of times to take this snapshot during the valid period of this action; default = 1                    |
| ignoreQuota | Only users with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this action will continue to run even if it reaches the quota.  |


#### Output and examples

!!! example
     `java -jar lightrunc.jar snapshot 95b4a928-4e57-4be3-8767-5d2167345389 PrimeMainMR.java:42`
	 
	 Results in:
	 
	 `The breakpoint was submitted`



### `snapshot-data`{#snapshot-data}

#### Description

This command prints the accumulated data for the specified snapshot to the specified output file. See [`snapshot`](#snapshot) for additional details.

#### Synopsis

`snapshot-data <AgentId> <SnapshotId>[<output-file>]`

#### Options

| Option     | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| Agent-ID   | Enter the ID of the relevant agent.                          |
| SnapshotId | The ID of the snapshot for which to print the existing data. |

#### Output and examples

!!! example

     The following:
     ```
     lightrunc snapshot-data e178578f-14da-476f-a084-bc460d6ec2b0 eb5abb0a-4677-4bed-9999-ea0b76c4efd2
     ```
     
     Returns the following:
     ```
     [class BreakpointDataDTO {
      actionId: eb5abb0a-4677-4bed-9999-ea0b76c4efd2
      agentId: e178578f-14da-476f-a084-bc460d6ec2b0
      createTime: class TimeDTO {
          nanos: 696685698
          seconds: 1611590801
      }
      dataId: 72f81a80-c415-4f00-a43d-83523a735230
      evaluatedExpressions: null
      stackFrames: [class AgentStackFrameDTO {
          arguments: [class WatchEntryDTO {
              members: null
              name: args
              status: null
              type: null
              value: null
              varTableIndex: 1
          }]
          function: PrimeMain.main
          locals: [class WatchEntryDTO {
              members: null
              name: i
              status: null
              type: int
              value: 30514481
              varTableIndex: null
          }]
          location: class LocationDTO {
              column: 0
              endOfLine: false
              line: 20
              path: PrimeMain.java
          }
      }]
      variableTable: [class WatchEntryDTO {
          members: null
          name: null
          status: class BreakpointStatusDTO {
              description: class BreakpointStatusDescriptionDTO {
                  format: Buffer full. Use an expression to see more data
                  parameters: null
              }
              isAccepted: false
              isError: true
              refersTo: VARIABLE_VALUE
          }
          type: null
          value: null
          varTableIndex: null
      }, class WatchEntryDTO {
          members: [class WatchEntryDTO {
              members: null
              name: length
              status: null
              type: int
              value: 0
              varTableIndex: null
          }]
          name: null
          status: null
          type: java.lang.String[]
          value: null
          varTableIndex: null
          }]
     }]
     ```

!!! tip
    You may use agent/action indexes instead of an ID. 
    For example:
    `java -jar lightrunc.jar snapshot-data 0 0 will output the first snapshot of the first agent`

!!! tip
    The output file is saved in JSON format, and can be manipulated by other tools.

### `status`

#### Description

Prints the current status of the Management server, including licensing information about the agent and other relevant details.

#### Synopsis

`java -jar lightrunc.jar status`

#### Options

None

#### Output and examples

!!! example
     
	 ```{bash}
	 Server URL: https://172.31.54.31:8080/company/my-company1
	 Company Name: my-company1
	 Version: 0.95
	 Backend Version: 0.95
	 Username: my-manager-account
	 Licenced Agents: 1000
	 Licence Expiry: 12/31/00
	 Exception Daily Limit: Not Reached
	 ```

### `toggle-action`

#### Description

Enable or disable the specified action. 

#### Synopsis

`lightrunc.jar toggle-actions <ActionId>`

#### Options

| Option    | Description                          |
| --------- | ------------------------------------ |
| Action-ID | Enter the ID of the relevant action. |


#### Output and examples

!!! example

     The following adds piping for actions on the agent by ID:
     
     `lightrunc.jar toggle-action 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388`
     
     Returns the following:
     
     `Log tracking in progress, use print-logs to view the output Action 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388 was successfully disabled`
     
     Running the same command again:
     
     `lightrunc.jar toggle-actions 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388`
     
     Returns the following:
     
     `Action 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388 was successfully enabled`

### `user`

#### Description

Prints all relevant details about the currently logged-in user.

#### Synopsis

`lightrunc.jar user`

#### Options

None

#### Output and examples

!!! example
     
	 Output appears in the following format:
	 
	 ``` {bash}
	 class UserDTO {
	      activated: true
		  authorities: [ROLE_MANAGER, ROLE_USER]
		  companyName: my-company1
		  createdBy: my-manager-account
	      createdDate: 2020-11-02T07:36:33.257Z
	      email: my-email@lightrun.com
	      firstName: Jane
	      id: c9e1d1a0-2880-46ee-a50f-8289b736d1c3
	      imageUrl: null
	      langKey: en
	      lastModifiedBy: my-manager-account
	      lastModifiedDate: 2020-11-02T07:36:45.978Z
	      lastName: Ch
	      login: my-manager-account
	      password: null
	      passwordHash: null
          passwordSet: true
          subscriptionStatus: STANDARD
	      }
	 ```


​			
### `version`

#### Description

Prints the version of Lightrun that is currently running on the Management server, and the CLI version. 

#### Synopsis

`java -jar lightrunc.jar version`



#### Options

None

#### Output and examples

!!! example
     
	 The following might be the current versions: 
	 ```
	 CLI Client Version: 0.95
	 Server Version: 0.95
	 ```


### `-v, verbose`

#### Description

Enable verbose mode. 

#### Synopsis

`lightrunc.jar -v`

#### Options

None


#### Output and examples

N/A


