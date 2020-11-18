#Author: Andrew Higgins
#Date: 09/23/20

sudo cp /var/log/syslog /home
egrep -i "error" /home/syslog | tee /home/megladon/Documents/lab_4/error_log_check.txt
ssmtp ahiggins34@live.com < /home/megladon/Documents/lab_4/error_log_check.txt
