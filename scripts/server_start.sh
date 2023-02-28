#!/usr/bin/env bash
cd /home/ec2-user/build
sudo nohup java -jar project_daily_auction-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null &