function codigoOLT() 
{
    let vlan = document.getElementById('vlan').value;
    let serial = document.getElementById('serial').value;
    let ont = document.getElementById('ont').value;
    serial = serial.slice(0,4) + ':' + serial.slice(4, serial.length);
    
    let writeSpace = document.getElementById("final")
    let code = 'configure equipment ont interface 1/1/'+ont+' sw-ver-pland disabled sernum '+serial+' cvlantrans-mode local fec-up enable enable-aes enable voip-allowed veip desc1 usuario desc2 cto<br>configure equipment ont interface 1/1/'+ont+' admin-state up<br>configure equipment ont slot 1/1/'+ont+'/1 planned-card-type 10_100base plndnumdataports 1 plndnumvoiceports 0 admin-state up<br>configure qos interface ont:1/1/'+ont+'us-num-queue 4<br>configure interface port uni:1/1/'+ont+'1/1 admin-up link-updown-trap<br>configure ethernet ont 1/1/'+ont+'/1/1 auto-detect 10_100_1000baset-auto<br>configure ethernet ont 1/1/'+ont+'/1/1 admin-state up<br>configure qos interface 1/1/'+ont+'/1/1 queue 0 priority 5 weight 0 shaper-profile name:1G<br>configure qos interface 1/1/'+ont+'/1/1 upstream-queue 0 priority  1 bandwidth-profile name:1G<br>configure bridge port 1/1/'+ont+'/1/1 max-unicast-mac 4<br>configure bridge port 1/1/'+ont+'/1/1 vlan-id 100 tag single-tagged l2fwder-vlan '+vlan+' vlan-scope local<br>exit all<br>admin save<br>admin software-mngt ihub database save-protected<br> '
    writeSpace.style = 'text-align: left;'
    writeSpace.innerHTML = code
    


    
}