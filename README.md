## Libvirt automatic reverse proxy

This little nodejs app will forward HTTP connections to your local libvirt containers/guests.
The route table is constructed by simply concatenating the local guest name to the host name. e.g.
host: ```myserver.local``` guests: ```foo, bar```, resulting routing table:

    {
      "foo.myserver.local": "foo",
      "bar.myserver.local": "bar"
    }


### node http reverse proxy for libvirt

    node server.js

Options:

* ```-h```        route host (```require('os').hostname```)
* ```-p```        listen port (80)
* ```-c```        virsh connection string (```lxc:///```)


#### usage with forever and libvirt hook system

Example of a ```/etc/libvirt/hooks/lxc``` (see [libvirt hooks](http://libvirt.org/hooks.html))

    #!/bin/bash
    sudo -H forever restart <path to this project>
