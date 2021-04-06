# The users' complete CLI guide and reference

Here you can find: 

- [Installation details](#installation)

- [Usage of command commands](#usage)

- [A complete reference for all commands, options and parameters](#reference)


!!! important
     
	 If the file name and line number don't match the bytecode version of the app, Lightrun will behave inconsistently and will most likely fail. 

--8<-- "docs/cli-setup.md"

## Installation

!!! prerequisites

    The Lightrun CLI requires Java be installed. 
    
    Make sure a user has already been created for you in Lightrun.


Before doing anything we must login and set the server URL. This must be done at least once per client machine.

!!! tip
     Login credentials are shared between the CLI and Plugin

``` {.bash}
lightrunc server-url https://192.168.0.10:8080/company/DefaultCompany
```

This will set the URL of the Management server to the given URL. We need to
replace `192.168.0.10:8080` with the actual server IP and port.

{== turn into troubleshooting for saas; what url should you enter (or should you enter a url?) if you're accessing the cloud and not on-prem? }


## Usage

!!! tip
     All CLI commands can be used with tags instead of agent IDs. Just use the syntax `tag:TagName` and replace the word `TagName` with the appropriate tag.

### Help

Run `lightrunc help` to list all available sub-commands and options.


### Insert a conditional log

Create and print logs based on specified conditions. 



#### Output and examples

!!! example

     ``` {.bash}
     lightrunc clog 5c6e9cdef4e833279ee286a1 Main.java:10  "i % 10 == 0" "Array size {arr.length}"
     ```
    
     The log is printed when the expression `i % 10 == 0` evaluates to `true`.



!!! tip
     Read more [here](#clog).


Once you no longer need the log, clean up with the [`rm` command](#rm)




### Insert a log

Use the `insert` command to insert a new log. 


#### Output and examples

!!! example

     ``` {.bash}
     lightrunc log 0 Main.java:10 "Array size {arr.length}"
     ```


     This command inserts a new log to the first agent. The log will print \"Array size \" followed by the result of the expression `arr.length`. This only works with the first agent has a class compiled from `Main.java` and has a variable called `arr` defined in line 10.



!!! tip
     You can also choose to add the log [based on a tag](#insert-log-to-tag) instead of a specific agent. 

### Insert log by tag

If you have more than one agent and you want to add logs to a tag instead of a specific agent, add the `tag` option.


#### Output and examples

!!! example

     ``` {.bash}
     lightrunc log tag:TagName Main.java:10 "Array size {arr.length}"
     ```


!!! tip
	 Read more [here](#log) for `log` command details.

### List agents and actions


List all agents along with the actions associated to each. 


#### Output and examples

!!! example

     `lightrunc list-agents` might result in output similar to this:
    
     ``` {.bash}
     0 : ID 5c6e9cdef4e833279ee286a1 HOST LAPTOP-GAJ05OS8 PID 18903 UPDATE Mon, 28 Oct 2019 16:19:03 GMT
     >  ACTION 8c6e9cdef4e833279ee265f FILE PrimeMain.java LINE 20 TXT Hello {cnt}
     ```

!!! tip
	 Read more [here](#log) for `log` command details.


### List all tags and actions

List all tags and the actions associated to each. 



#### Output and examples

!!! example

     `lightrunc list-tags` might result in output similar to this:
    
     ``` {.bash}
     Tag: Production
        ACTION 4261257f-fbc0-4fc5-8fe7-e8dbf3944eb7 FILE PrimeMainMR.java LINE 10 TYPE TICTOC
        ACTION 74d07247-d181-40e3-8d99-df3d3cf1161c FILE PrimeMainMR.java LINE 24 TYPE LOG Hello world {java expression}
        ACTION 99e8e7b0-9248-4d89-8f6f-2d3c5fa9aebc FILE PrimeMainMR.java LINE 15 TYPE LOG Hello world {java expression}gg
        ACTION b383e31b-8749-419f-a492-85a919cc0da8 FILE PrimeMainMR.java LINE 22 TYPE TICTOC
        ACTION c3f863e6-ba7d-4480-83c0-ef4a278ecddb FILE PrimeMainMR.java LINE 15 TYPE COUNTER
        ACTION e5790c99-f763-4d26-8d3f-2714c89c0fad FILE PrimeMainMR.java LINE 10 TYPE BREAKPOINT
     ```
!!! tip
	 Read more [here](#log) for `log` command details.



### List actions by agent

Get a complete list of all of the actions associated with the specified agent, based on agent ID or by using an offset. 



#### Output and examples

!!! example
     Use the offset 0 to indicate the list of actions should be returned for the first agent. 
	 
	 ``` {.bash}
	 lightrunc list actions 0
	 ```
	
	 Alternatively, you can request the full list of actions for agent ID 5c6e9cdef4e833279ee286a1:
	
	 ``` {.bash}
	 lightrunc list actions 5c6e9cdef4e833279ee286a1
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


!!! tip
	 Read more [here](#rm) for details.

## The complete reference {#reference}


### `enable-piping`


#### Description

Enable piping logs, counters and TicTocs to the backend for this agent so that you can view the output directly from the app. 

You can then also view the data from the CLI using the `print-logs` command; actions are printed in the server.
					

#### Synopsis

`lightrunc enable-piping <Agent-ID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |


#### Output and examples

!!! example

     The following removes the first action for the first agent:
     ```
     lightrunc enable-piping 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```


### `client-piping`

#### Description

Logs, counters and TicTocs for this agent ID will be piped to the backend and hidden in the server.

Logs are available with the `print-logs` command.

#### Synopsis

`lightrunc client-piping <Agent-ID>`

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




### `disable-piping`

#### Description

Stops tracking all logs, counters and tictocs for the given agent by ID; the action continues to run and all data is still stored your server.


#### Synopsis

`lightrunc disable-piping <Agent-ID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

!!! example

     The adds piping for actions on the agent by ID:
     ```
     lightrunc disable-piping 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```


### `toggle-action`

#### Description

Enable or disable an action. 

#### Synopsis

`lightrunc toggle-actions <ActionId>`

#### Options

| Option    | Description                          |
| --------- | ------------------------------------ |
| Action-ID | Enter the ID of the relevant action. |


#### Output and examples

!!! example

     The following adds piping for actions on the agent by ID:
     ```
     lightrunc toggle-actions 9cd7d1cd-bbd3-4ebb-ae5d-af068006f388
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```



### `add-certificate`

#### Description

You can assign multiple certificates to the same server.

Each subdomain can also have its own verification, increasing the security of the site by decentralizing its reliance on a single certificate.

#### Synopsis

`lightrunc add-certificate <Certificate>`

#### Options

| Option      | Description         |
| ----------- | ------------------- |
| Certificate | what is this value? |

#### Output and examples

No output is printed. The certificate is added to the server.

### `show-certificates`

#### Description

Show all the server certificates

#### Synopsis

`lightrunc show-certificates`

#### Options

None


#### Output and examples

!!! example

     The following adds the certificate `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2`:
     ```
     lightrunc add-certificate 515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```


​	  
### `rm-certificate`

#### Description

Remove any server certificate.

#### Synopsis

`lightrunc rm-certificate'

#### Options

| Option      | Description |
| ----------- | ----------- |
| Certificate | ???         |


#### Output and examples

!!! example

     The following removes the certificate `515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2` from the server:
     ```
     lightrunc rm-certificate 515a630cfd1fb908e30087bcc20b7413ad146b9bf2b23d3aaa72c28e45b24fb2
     ```


​								  
### `enable-pinning-status`


#### Description

Enables certificate pinning.


#### Synopsis

`lightrunc enable-pinning-status`

#### Options

None

#### Output and examples
No output. Certifcate pinning is enabled.
	  
### `disable-pinning-status`

#### Description

Disable certificate pinning.

#### Synopsis

`lightrunc disable-certificate-pinning`

#### Options

None

#### Output and examples
No output. Certifcate pinning is disabled.


### `get-pinning-status`

#### Description

Returns the pinning status: enabled, or disabled.

#### Synopsis

`lightrunc get-pinning-status`

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



### `customMetric`

#### Description

Build a custom metric based on specified expressions and values. 

#### Synopsis

`lightrunc customMetric <AgentId> <FileName>:<LineNumber> <MetricName> <MetricExpression> [-condition <Condition>] [-expireSec <ExpireSec>] [-ignoreQuota]

#### Options

| Option           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| Agent-ID         | Enter the ID of the relevant agent.                          |
| FileName         | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber       | The line number within the code file.                        |
| MetricName       |                                                              |
| MetricExpression |                                                              |
| Condition        |                                                              |
| ExpireSec        |                                                              |
| ignoreQuota      |                                                              |

!!! note 

     The `-ignoreQuota` condition can only be used by administrators.

#### Output and examples

{== need a good example + output}
	  
!!! example

     The following:
     ```
     lightrunc customMetric 95b4a928-4e57-4be3-8767-5d2167345389 PrimeMainMR.java:40 var>3
     ```
     
     Returns the following:
     ```
     Log tracking in progress, use print-logs to view the output  
     ```


​                                  
### `snapshot-data`

#### Description

This command prints the accumulated data for the specified snapshot.

#### Synopsis

`snapshot-data <AgentId> <SnapshotId>`

#### Options



| Option     | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| Agent-ID   | Enter the ID of the relevant agent.                          |
| SnapshotId | The ID of the snapshot for which to print the existing data. |

#### Output and examples

!!! example

     The following:
     ```
     lightrunc snapshot-data 336bfe2e-1ddd-477d-b68d-6ea46657e711 e5790c99-f763-4d26-8d3f-2714c89c0fad
     ```
     
     Returns the following:
     ```
     {== I need a good example of output ==}
     ```

### `list-agents`

#### Description

Lists all agents and the associated actions for each.

#### Synopsis

`lightrunc list-agents`


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

`lightrunc list-agents-by-tag <Tag>`

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

`lightrunc list-tags`

#### Options

None

#### Output and examples

!!! example

     The output might be similar to this:
    
     ``` {.bash}
     {== need a good example ==}
     ```



### `list-actions` {#listactions}

#### Description

List all actions for the specified agent, including current status, all configurations and details.

#### Synopsis

`lightrunc list-actions <AgentId>`

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
         ownerUser: rachel-manager
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


​	  
​	  
### `log`

#### Description

Insert a log for the given agent, at the given file and line with the format (text of the log).

Inserted logs timeout after 24 hours by default, unless configured otherwise.

#### Synopsis

`lightrunc log <AgentId> <Filename>:<LineNumber> <Format> -expireSec`

#### Options

| Option       | Description                         |
| ------------ | ----------------------------------- |
| Agent-ID     | Enter the ID of the relevant agent. |
| Filename     |                                     |
| LineNumber   |                                     |
| Format       |                                     |
| -expireSec   |                                     |
| -ignoreQuota |                                     |

#### Output and examples

!!! example

     Run the following command to insert a log: 
     
     ```{== need an example - not able to run successfully for some reason}
     ```
     
     The output might be similar to this:
    
     ``` {.bash}
     {== need a good example ==}
     ```




### `clog` {#clog}

#### Description

Insert a conditional log for the given agent in the given file and line with the format as configured.

#### Synopsis

`lightrunc clog <AgentId> <Filename>:<LineNumber> <Format> -condition -expireSec`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| Format      |                                                              |
| Condition   |                                                              |
| ExpireSec   |                                                              |
| ignoreQuota |                                                              |

#### Output and examples

!!! example
     Run the following command to insert a log: 
	 
	 ```lightrunc clog 5c6e9cdef4e833279ee286a1 Main.java:10  "i % 10 == 0" "Array size {arr.length}"
	 ```
	 
	 The log is printed when the expression `i % 10 == 0` evaluates to true.

### `snapshot`

#### Description

A snapshot is a breakpoint added in the given agent at the given file and line. 

#### Synopsis

`lightrunc snapshot <AgentId> <Filename>:<LineNumber> -condition`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| Condition   |                                                              |
| ExpireSec   |                                                              |
| MaxHitCount |                                                              |
| ignoreQuota |                                                              |


#### Output and examples

!!! example
     `lightrunc snapshot 95b4a928-4e57-4be3-8767-5d2167345389 PrimeMainMR.java:36`
	 
	 Results in:
	 
	 `The breakpoint was submitted`




### `counter`

#### Description

Insert a counter to count the number of times each thread hits the requested line based on the options you configure.

#### Synopsis

`lightrunc counter <AgentId> <Filename>:<LineNumber> <CounterName> -condition -expireSec`

#### Options

| Option      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Agent-ID    | Enter the ID of the relevant agent.                          |
| FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
| LineNumber  | The line number within the code file.                        |
| CounterName |                                                              |
| Condition   |                                                              |
| ExpireSec   |                                                              |
| aggregateBy |                                                              |
| ignoreQuota |                                                              |

#### Output and examples

!!! example
     `lightrunc snapshot 95b4a928-4e57-4be3-8767-5d2167345389 PrimeMainMR.java:36`

	 Results in:
	 
	 {== need an example - not able to run successfully for some reason}

### `rm` {#rm}

#### Description

Removes the specified log from the given agent based on agent ID or tag.


#### Synopsis

`lightrunc rm <AgentId> <LogId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |
| ActionId |                                     |

#### Output and examples

!!! example

     `lightrunc.jar rm e93fccd1-9f76-46ae-b703-056e25b8092e 4261257f-fbc0-4fc5-8fe7-e8dbf3944eb7`
     
     Returns:
     
     `The action was removed`

### `rm-tag`

#### Description

Removes the specified tag from the server.

#### Synopsis

`lightrunc rm-tag <tagName>`

#### Options

| Option | Description                   |
| ------ | ----------------------------- |
| Tag    | The name of the relevant tag. |

#### Output and examples

{== what's the output? ==}


### `status`

#### Description

Prints the current status of the Management server, including licensing information about the agent and other relevant details.
#### Synopsis

`lightrunc status`

#### Options

None

#### Output and examples

!!! example
     
	 ```{bash}
	 Server URL: https://172.31.54.31:8080/company/rachelc
	 Company Name: rachelc
	 Version: 0.95
	 Backend Version: 0.95
	 Username: rachel-manager
	 Licenced Agents: 1000
	 Licence Expiry: 12/31/00
	 Exception Daily Limit: Not Reached
	 ```


​	  
### `detach`

#### Description

When experiencing any issues on the server, you might want to disable Lightrun in order to rule it out when troubleshooting.

The `detach` command disables all Lightrun agents on the specified server when turned "on". When you turn it off, agents resume.

#### Synopsis

lightrunc detach on/off

#### Options

None

#### Output and examples


!!! example

     ``` {.bash}
     lightrunc detach on 
     ```
### `enable-logs`

#### Description

Logs are enabled for the specified agent.

#### Synopsis

`lightrunc enable-logs <AgentId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

`lightrunc enable-logs <AgentId>`

{== what's the output? ==}

### `print-logs`

#### Description

Prints all data in the logs currently for the specified action on the specified agent.

#### Synopsis

`lightrunc print-logs <AgentId> <ActionID>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |
#### Output and examples

`lightrunc print-logs <AgentId>`

{== need example of output ==}

### `client-logs`

#### Description

Logs for the specified agent can be viewed from the client, and are hidden from the server.

#### Synopsis

`lightrunc client-logs <AgentId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |

#### Output and examples

{== need example of output ==}

### `disable-logs`

#### Description


Stops tracking logs for the
    given agent ID in the Management server/client
	
#### Synopsis

`lightrunc disable-logs <AgentId>`

#### Options

| Option   | Description                         |
| -------- | ----------------------------------- |
| Agent-ID | Enter the ID of the relevant agent. |
| ActionId |                                     |


#### Output and examples


{== need example of output ==}


### `server-url`

{== don't understand what this does ==}

#### Description

#### Synopsis

`lightrunc server-url <ServerURL>`

#### Options

| Option    | Description |
| --------- | ----------- |
| ServerURL |             |

#### Output and examples

{== need example of output ==}

### `logout`

#### Description

Logs out the currently logged in user from the Lightrun account.

#### Synopsis

`lightrunc logout`

#### Options

None

#### Output and examples

{== is there output? confirmation? ==}
									
### `version`

#### Description

Prints the version of Lightrun that is currently running on the Management server, and the CLI version. 

#### Synopsis

#### Options

None

#### Output and examples

!!! example
     
	 The following might be the current versions: 
	 ```
	 CLI Client Version: 0.95
	 Server Version: 0.95
	 ```

### `listen`

#### Description

Listens to agent/log registration events and prints them out.

#### Synopsis

`lightrunc listen`

#### Options

None 

#### Output and examples

{== any relevant output? ==}
	  

### `-v`

#### Description

Enable verbose mode. 

#### Synopsis

`lightrunc -v`

#### Options

None


#### Output and examples

N/A

### `user`

#### Description

Prints all relevant details about the currently logged-in user.

#### Synopsis

`lightrunc user`

#### Options

None

#### Output and examples

!!! example
     
	 Output appears in the following format:
	 
	 ``` {bash}
	 class UserDTO {
	      activated: true
		  authorities: [ROLE_MANAGER, ROLE_USER]
		  companyName: rachelc
		  createdBy: rachel-manager
	      createdDate: 2020-11-02T07:36:33.257Z
	      email: rachel1@lightrun.com
	      firstName: Rachel
	      id: c9e1d1a0-2880-46ee-a50f-8289b736d1c3
	      imageUrl: null
	      langKey: en
	      lastModifiedBy: rachel-manager
	      lastModifiedDate: 2020-11-02T07:36:45.978Z
	      lastName: Ch
	      login: rachel-manager
	      password: null
	      passwordHash: null
	      }
		  ```

