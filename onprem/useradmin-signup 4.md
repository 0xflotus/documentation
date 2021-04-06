{==Now that the Management server is running we need to create a user and (i need to see this stage in order to document it ==}
login. We need to navigate in the browser to the server.

!!! note
    Notice that the URL is `https` and defaults to port `8080`. There should be a self signed certificate warning from the browser! If you are having issues accessing the server from your browser due to a certificate
blocking please follow the guidelines in the `Troubleshooting certificates issues` section
:::

![Initial Web Page](assets/images/backend-first-ui.png)

Under the account menu we can select register and create a new user
account.

![Register Menu](assets/images/backend-logged-out-account-menu.png)

We can use any details as a verification email isn't sent at this time,
however values should be unique.

![Registration](assets/images/backend-registration.png)

Once registered we can login immediately and should see this UI:

![Management Server Post Login](assets/images/backend-logged-in.png)

Notice this page is scrollable. It includes all of the important
instructions required for getting started.
