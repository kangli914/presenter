#!/bin/bash

### INIT INFO
# Provides:          windows_desktop
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: windows_desktop
# Description:       mounts windows share 'C:\debianvm\presenter' to debian /home/kangli/presenter
### END INIT INFO



# fix the mount issue when windows rebooted

sudo umount /home/kangli/presenter > /dev/null 2>&1
sudo mount.cifs //10.0.2.2/debianvm/presenter /home/kangli/presenter -o user=xxx,password=xxx,rw,uid=1000,gid=1000
