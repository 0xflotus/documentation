# Install the IntelliJ plugin

Before proceeding to installation ensure you have fulfilled following prerequisites:

- IntelliJ IDEA 2018.3 or newer
- Make sure the manager of your Lightrun account has deployed at least one Lightrun agent

!!! note
    
	 Lightrun currently supports the IntelliJ IDE. 


###### Install the plugin

Now that the agent is up and running with your app, you can install the plugin in IntelliJ. This is where you will work - directly from your IDE. 

1. Log in to your Lightrun account from your local environment. 

    The Lightrun installation page loads, with installation instructions and relevant CLI commands. 
    
2. Scroll down to the **Install the Plugin** section. 

3. Click **Download plugin** and store the file in a memorable location. Don't unzip the file.

4. Now, navigate to your IntelliJ instance. 

5. From IntelliJ, navigate to Preferences (on Mac OS) or Settings (On Windows/Linux):

    ![IntelliJ Preferences Menu on Mac OS](assets/images/intellij-preferences-mac.png)

6. Go to the Plugins section:
   
    ![The plugins section](assets/images/plugins-section.png)
   
7. Click the settings cog from the top right and select **Install Plugin from Disk**:

    ![Install Plugin from Disk](assets/images/install-plugin.png)

8. Select the plugin zip file from the folder where you stored it in **step 3**.
   
    Once installed, Lightrun options appear in the **Settings** menu. 
   
    **Plugins**:
	
	![Plugin Settings](assets/images/intellijSettings.png)
	
	**Lightrun settings**:
	
	![Lightrun Settings](assets/images/intellijSettings2.png)
    
    You can configure these settings as follows:
    
    - Lightrun Server URL - this is our backend server it should point to the right URL by default
    
    - Source Version Warnings - we alert you if the code in the IDE doesn't match the code that is running our agent
    
    - Use Embedded Browser - this enables login and authentication directly from the IDE; if disabled, when logging in you are redirected to your default browser
    
    - Certificate Pinning - verifies the server certificate matches your requests and that you are actually connecting to the Lightrun server; this feature enforces security and is highly recommended
   
9. When prompted, restart IntelliJ.

    Lightrun appears in the right-hand sidebar. 

!!! note

    The **Use an embedded browser** option is supported on IntelliJ 2020.2 and newer. 
   
    Some OS configurations might fail when launching the login UI for the browser. In those cases please activate this option explicitly and update your IDE to 2020.2 or newer.
    

