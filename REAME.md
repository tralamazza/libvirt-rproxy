### node http reverse proxy for libvirt

    node server.js


#### usage with forever and libvirt hook system

Example of a ```/etc/libvirt/hooks/lxc```:

    #!/usr/bin/bash
    sudo -H forever restart <path to this project>
