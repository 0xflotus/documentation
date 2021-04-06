# Administration from the terminal

From the terminal, managers can: 

- [Run administrator commands from the Lightrun CLI](#lightrun-cli)

- [Configure certain agent properties](agentadmin-agentprops.md#cli)


The commands described here can only be performed by a Lightrun administrator (Manager role). 



!!! important
     
	 If the file name and line number don't match the bytecode version of the app, Lightrun will behave inconsistently and will most likely fail. 



## Lightrun CLI

## Set up your CLI

--8<-- "docs/cli-setup.md"




### `create-user`

#### Description

The `create-user` creates a new user based on the specified options.



#### Synopsis


``` {.bash}
lightrunc.jar create-user <Username> <FirstName> <LastName> <Email> <Role1> <Role2>...
```



#### Options

-   Username

-   Email

-   Role

    Following are valid values:
	
	- ROLE_ADMIN
    - ROLE_MANAGER 
	- ROLE_USER 
	- ROLE_AGENT

!!! note
     Only the administrator is authorized to create a user with ROLE_AGENT.



#### Output and examples
!!! example

     The following creates a new user with the User role.
    
     ``` {.bash}
     lightrunc.jar create-user newuser1 Jane Doe jane@yourcompany.com ROLE_USER 
     ```
     
     When you press Enter, the terminal requests a password for the new user. 
     
     Enter a password, press Enter and the terminal prints: 
     
     `User successfully created in company YourCompany`



### `delete-user`

### Description

Delete a specified user. The user must first be deactivated before they can be deleted. You can deactivate directly from the app by navigating to Manager->User management.


#### Synopsis

``` {.bash}
lightrunc.jar delete-user <user name>
```


#### Options

user name - the user name for the user to be deleted

#### Output and examples

!!! example
     ``` {.bash}
     lightrunc.jar delete-user SMITHJ
     ```
     The following is printed in the terminal: 
	 
	 `User Deleted`

[//]: # ### `set-value`
[//]: # 
[//]: # #### Description
[//]: # 
[//]: # Administrators with the Set Value role can insert Lightrun actions with conditions that change the values of specified variables in your code.
[//]: # 
[//]: # #### Synopsis
[//]: # 
[//]: # ``` {.bash}
[//]: # lightrunc.jar set-value <AgentId> <FileName>:<LineNumber> -expireSec <VarName1=VarValue> <VarName2=VarValue>…​
[//]: # ```
[//]: # 
[//]: # #### Options
[//]: # 
[//]: # 
[//]: # | Option      | Description                                                  |
[//]: # | ----------- | ------------------------------------------------------------ |
[//]: # | Agent-ID    | Enter the ID of the relevant agent                           |
[//]: # | FileName    | The name of the file containing the code in which to add the metric, including the extension. For example: MyJavaFile.java |
[//]: # | LineNumber  | The line number within the code file                         |
[//]: # | VarName     | Any valid Java expression, including functions               |
[//]: # | Condition   | Any valid Java expression, including functions               |
[//]: # | ExpireSec   | Configure the duration that this metric should run in seconds |
[//]: # | ignoreQuota | Only administrators with the Ignore Quota role can use this option. When set, the quota limit configured for running Lightrun actions is overriden and this custom metric will continue to run even if it reaches the quota. |
[//]: # 
[//]: # #### Output and examples
[//]: # 
[//]: # ``` {.bash}
[//]: # lightrunc set-value <AgentId> <FileName>:<LineNumber> -expireSec <VarName1=VarValue> <VarName2=VarValue>…​
[//]: # ```
[//]: # 
### `clear-exceptions`

#### Description

Clear all exceptions from history.

#### Synopsis

`lightrunc clear-exceptions`

#### Options

None

#### Output and examples

The following output is printed: 

`Successfully cleared exceptions history from the server `

