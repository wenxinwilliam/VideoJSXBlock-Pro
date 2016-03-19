videojsXBlock-Pro
=========

This XBlock provides the Video.js player (www.videojs.com) instead of the default one.
Thanks MarCnu(https://github.com/MarCnu/videojsXBlock).I'm deeply appreciate him for his previous effors. 

## Features:
  1.Keep track of users activities in edX-platform tracking log
  2.Enable the caption to display and you can upload it or directly link to the external source.
  3.True full screen allowed
  4.More video speeds available : | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | by default
  5.(Optional) Source document download button, for example to provide your PPT or PDF file

## Pre-requirements:
  1. EdX platform installed;
  2. Skilful in operating system of Linux.

## Installations:
#### 1. Make sure you have the following items in your config file - cms.env.json
  
  > "ALLOW_ALL_ADVANCED_COMPONENTS": True
  
  If it does not exist, insert it into the "FEATURES".
  
#### 2. Execute the commands
  * Switch to user "edxapp"
  
  >sudo -H -u edxapp bash
  * Change directory to "edxapp" home
  
  >cd ~
  * Loading the virtual environment of edxapp
  
  >source edxapp_env
  * Clone the XBlock to certain directory
  
  >git clone git@github.com:longmen21/VideoJSXBlock-Pro.git
  * Install
  
  >pip install -e ./VideoJSXBlock-Pro
  * Bach to the user "edustack"
  
  >exit
    
#### 3. Restart the CMS platform
  
  >source /edx/bin/supervisorctl restart edxapp:

#### 4. courses settings
  
  >Go to Settings -> Advanced Settings and set advanced_modules to ["videojs"].

## Suggestions:
  Keep the user "edxapp" clear of the privilege "sudo", you ought to switch the current user to "edustack" if you need the superior authority.
