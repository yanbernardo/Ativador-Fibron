function codigoOLT() 
{
    let vlan = document.getElementById('vlan').value;
    let serial = document.getElementById('serial').value;
    let ont = document.getElementById('ont').value;
    serial = serial.slice(0,4) + ':' + serial.slice(4, serial.length);
    
    let writeSpace = document.getElementById("final")
    let code = `configure equipment ont interface 1/1/${ont} sw-ver-pland disabled sernum ${serial} cvlantrans-mode local fec-up enable enable-aes enable voip-allowed veip desc1 usuario desc2 cto
    configure equipment ont interface 1/1/${ont} admin-state up
    configure equipment ont slot 1/1/${ont}/1 planned-card-type 10_100base plndnumdataports 1 plndnumvoiceports 0 admin-state up
    configure qos interface ont:1/1/${ont}us-num-queue 4
    configure interface port uni:1/1/${ont}1/1 admin-up link-updown-trap
    configure ethernet ont 1/1/${ont}/1/1 auto-detect 10_100_1000baset-auto
    configure ethernet ont 1/1/${ont}/1/1 admin-state up
    configure qos interface 1/1/${ont}/1/1 queue 0 priority 5 weight 0 shaper-profile name:1G
    configure qos interface 1/1/${ont}/1/1 upstream-queue 0 priority  1 bandwidth-profile name:1G
    configure bridge port 1/1/${ont}/1/1 max-unicast-mac 4<br>configure bridge port 1/1/${ont}/1/1 vlan-id 100 tag single-tagged l2fwder-vlan ${vlan} vlan-scope local
    exit all
    admin save
    admin software-mngt ihub database save-protected
    `
    writeSpace.innerText = code

    writeSpace.style = 'text-align: left;'
}