# Meower Desktop
The Meower Launcher
## Building from Source
To build Meower Desktop from source, first check if you have npm installed by using the following command:
```
npm -v
```
Then, download the source with git, or click on the green "Code" button, then click on "Download .ZIP". `cd` to "Meower-Desktop", then run:
```
npm init
```
...To initialize the folder. Install all dependencies, like `electron` by using:
```
npm install
```
Finally, to the buliding part, run:
```
npm run make
```
It'll now make a executable file taliored to your system for you. Now, all you need to do now is to wait for it to `make`! The rest will be for UNIX systems.

Now, a executable file for your system will show up in `out/make/`. `cd` to that location and run `dir` to find the executable for the system you're using. Once found, run:
```
chmod a+x ./meower-<latest-version>.<executable-name>
```
Or, if you aren't in the directory:
```
chmod a+x ./out/make/meower-<latest-version>.<executable-name>
```
Now run the executable by using the following command:
```
./meower-<latest-version>.<executable-name>
```
Or, if you're still not in the directory:
```
./out/make/meower-<latest-version>.<executable-name>
```
Congradulations! You just built and ran Meower Desktop! Or you can get a pre-built executable by looking at the "Releases" section, because building is a pain, and it's recommended to get a executable from the releases section.
