#!/bin/sh

heroku login
heroku create -a j2gapi
heroku config:set -a j2gweb PROCFILE=web/Procfile
git push https://git.heroku.com/j2gapi.git HEAD:maste