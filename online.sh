#!/bin/bash
FE_SOURCE_PATH=$1
FE_DEST_PATH=$2
FE_PUBLIC_PATH=$3
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

npm run build -- --publicPath=${FE_PUBLIC_PATH}
test -d ${FE_DEST_PATH} && rm -rf ${FE_DEST_PATH}

mkdir -p ${FE_DEST_PATH}
cp -R -f ${FE_SOURCE_PATH}dist/client/* ${FE_DEST_PATH}
tar -czvf ${FE_DEST_PATH}.tar.gz ${FE_DEST_PATH}
test -d releases && rm -rf releases
mkdir releases && mv ${FE_DEST_PATH}.tar.gz releases/

end=$(date +%s)
time=$(( $end - $start ))

echo "fe build in ($time) 秒"
