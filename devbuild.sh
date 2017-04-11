#!/bin/bash
FE_SOURCE_PATH=$1
FE_DEST_PATH=$2
start=$(date +%s)


set -e

reset="\e[0m"
red="\e[0;31m"
green="\e[0;32m"
cyan="\e[0;36m"
white="\e[0;37m"

echo "check redskull"

if [ -d "$HOME/.redskull" ];then
  printf "$red> ~/.redskull already exists, will check update$reset\n"
  redskull checkupdate
else
  printf "redskull not exits will install\n"
  curl http://git.lianjia.com/hydra/redskull/raw/master/script/install.sh -L -o - | sh
fi

echo "install deps"
redskull install

echo "build source"

npm run server
