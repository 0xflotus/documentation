

1. [Install the CLI](#install)

2. [Authenticate the CLI](#authenticate)

###### To use the Lightrun CLI {#install}

!!! prerequisites

     [Sign up](createaccount.md) for your Lightrun account before getting started.
     
     The Lightrun CLI requires Java be installed.


1. Log in to your Lightrun account from the browser and navigate to **Getting Started**. 

2. Download 'lightrunc.jar' from the landing page from the **Command Line Tool** section. 

3. Open the terminal and navigate to where you downloaded the file.

4. [Authenticate](#authenticate) your CLI with your Lightrun account:

  1. Copy and run the first command line that appears in your browser. 
  
    !!! example
    
      `java -jar lightrunc.jar server-url https://2147483647.lightrun.com/company/acme`
    
  2. Copy and run the second command line that appears in your browser. 
  
    !!! example
    
      `java -jar lightrunc.jar login myaccount@acme.com`
    

5. To run any Lightrun command, add the following prefix: 

     ``` bash
     java -jar lightrunc.jar
     ```


###### Authenticate the CLI with Lightrun {#authenticate}

To use the CLI, first authenticate with your Lightrun account. You can authenticate directly from within the CLI or choose to redirect to the browser. 

``` {.bash}
lightrunc.jar login <username/email address/password>
```

!!! example

    Log in directly from the CLI:

    ```java -jar lightrunc.jar login -email jane.doe@example.com -password secretpassword```

!!! example

    Log in with a redirect to your browser:

    `java -jar lightrunc.jar login myaccount@acme.com`

