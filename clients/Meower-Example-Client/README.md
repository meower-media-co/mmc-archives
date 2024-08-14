# Meower Example Client

This repo is an example for Meower client developers on how to implement features into it. It is not meant to be used as a normal client.

It's goal is to be 100% inline with RFC-1-Clients.

## TODO:

-   [x] Init App (SvelteKit)
-   [ ] User profiles
-   [x] Custom PFPs
        - Note: cannot upload custom pfps (yet)
-   [x] Default PFPs, extra can be added by uploading as a custom PFP.
-   [ ] Post/User reporting.
-   [ ] Chats, Sub-Features listed below
    -   [ ] Chat Member management
    -   [ ] Creating Chats
-   [ ] Logging In/Signing up
-   [x] Home page
-   [ ] ALL settings
-   [ ] Searching
-   [ ] Blocking/Reporting users
-   [x] Bridge Support
-   [ ] Sending typing indication
-   [ ] Displaying other typing indecators
-   [x] Markdown
-   [x] Image host whitelist (Until we get a image reflector), Can be disabled by the user (With warning before disabling!)
        Current list of allowed Image hosts:
    -   https://meower.org/
    -   https://http.meower.org/
    -   https://assets.meower.org/
    -   https://forums.meower.org/
    -   https://go.meower.org/
    -   https://hedgedoc.meower.org/
    -   https://docs.meower.org/
    -   https://uploads.meower.org/
    -   https://u.cubeupload.com/
    -   https://cubeupload.com/
    -   https://i.ibb.co/
    -   https://media.tenor.com/
    -   https://tenor.com/
    -   https://c.tenor.com/
    -   https://assets.scratch.mit.edu/
    -   https://cdn2.scratch.mit.edu/
    -   https://cdn.scratch.mit.edu/
    -   https://uploads.scratch.mit.edu/
    -   https://cdn.discordapp.com/
    -   https://media.discordapp.net/
-   [ ] Option to switch to an external sever.
        The client does not need to support servers with breaking changes. The only exception to this is when the offical server makes a breaking change.

## Library

This client will use Meower.js exclusively for connecting to meower, no bypassing private vars.
