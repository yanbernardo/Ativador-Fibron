// CRISE QUICK FIX

function atualizarPPPoE() {
    ONU = new OnuDataEntry();
    OLT = ONU.getOLT();

    let script = `DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-2;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-3;


ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-2::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username,PARAMVALUE="${ONU.getUser()}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-3::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password,PARAMVALUE="${ONU.getPassword()}";`

    writeScript(script)
    setButtonVisibility("visible");
}


// Provisionamento

function provisionarOLTNokiaCLI() {
    
    ONU = new OnuDataEntry();
    ONU.setOLT("HL")
    OLT = ONU.getOLT();
    writeScript(generateProvCode(OLT, ONU));
    setButtonVisibility("visible");
}

function provisionarOLTNokiaTLI() {
    ONU = new OnuDataEntry();
    OLT = ONU.getOLT();
    writeScript(generateProvCode(OLT, ONU));
    setButtonVisibility("visible");

}

function provisionarOLTFurakawa() {
    ONU = new OnuDataEntry();
    OLT = ONU.getOLT();
    writeScript(generateProvCode(OLT, ONU))
    setButtonVisibility("visible");

}

function provisionarOLTParks() {
    ONU = new OnuDataEntry();
    OLT = ONU.getOLT();
    writeScript(generateProvCode(OLT, ONU))
    setButtonVisibility("visible");
}

// Desprovisionamento

function desprovisionarNokiaCLI() {
    ONU = new OnuDataEntry();
    ONU.setOLT("HL");
    OLT = ONU.getOLT();
    writeScript(generateUnprovCode(OLT, ONU));
    setButtonVisibility("visible");
}

function desprovisionarGeral() {
    ONU = new OnuDataEntry();
    OLT = ONU.getOLT();
    writeScript(generateUnprovCode(OLT, ONU));
    setButtonVisibility("visible");
}

function gerarScriptCanalTLI() {
    ONU = new OnuDataEntry();
    let code;

    if (ONU.getCanal5() == "none" && ONU.getCanal2() == "none") {
        window.alert("Preencha pelo menos uma das opções!")
    } else if (ONU.getCanal2() == "none") {
        code = `DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-24;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-25;
        
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-24::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.AutoChannelEnable,PARAMVALUE="false"
Y
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-25::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.Channel,PARAMVALUE="${ONU.getCanal5()}";`
    } else if (ONU.getCanal5() == "none") {
        code = `DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-22;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-23;

ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-22::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable,PARAMVALUE="false"
Y
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-23::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel,PARAMVALUE="${ONU.getCanal2()}";
`
    } else if (ONU.getCanal5() != "none" && ONU.getCanal2() != "none") {
        code = `DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-22;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-23;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-24;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-25;

ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-22::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable,PARAMVALUE="false"
Y
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-23::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel,PARAMVALUE="${ONU.getCanal2()}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-24::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.AutoChannelEnable,PARAMVALUE="false"
Y
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-25::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.Channel,PARAMVALUE="${ONU.getCanal5()}";
`
    }

    writeScript(code);
    setButtonVisibility("visible");
}

// -------------------------------------

function generateProvCode(OLT, ONU) {
    console.log("Nome da OLT: " +OLT)
    if (OLT == 'HL') {
return `configure equipment ont interface 1/1/${ONU.getOnuPos()} sw-ver-pland disabled sernum ${ONU.getSerialSplit()} cvlantrans-mode local fec-up enable enable-aes enable voip-allowed veip desc1 C${ONU.getCirc()}-CT${ONU.getCTO()} desc2 COD.${ONU.getClientID()}
configure equipment ont interface 1/1/${ONU.getOnuPos()} admin-state up  
configure equipment ont slot 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()} planned-card-type veip plndnumdataports 1 plndnumvoiceports 0  
configure qos interface ont:1/1/${ONU.getOnuPos()} us-num-queue 4  
configure interface port uni:1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 admin-up link-updown-trap  
configure veip ont 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 domain-name VEIP1  
configure veip ont 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 admin-state up  
configure qos interface 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 queue 0 priority 5 weight 0 shaper-profile name:1G 
configure qos interface 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 upstream-queue 0 priority 1 bandwidth-profile name:1G 
configure bridge port 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 max-unicast-mac 4 
configure bridge port 1/1/${ONU.getOnuPos()}/${ONU.getOnuVeip()}/1 vlan-id 100 tag single-tagged l2fwder-vlan ${verificarVLAN(ONU.getOnuPosArr(), OLT)} vlan-scope local  
exit all  
admin save  
admin software-mngt ihub database save-protected  
exit all  
            `;
    }

    if (OLT == 'AM' || OLT == 'PB') {
        if (ONU.getSerial().slice(0,4) == "ALCL") {
            return `ENT-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}::::DESC1="${ONU.getONUModelAuto()}",DESC2="COD.${ONU.getClientID()}",SERNUM=${ONU.getSerial()},SWVERPLND=AUTO,OPTICSHIST=ENABLE,PLNDCFGFILE1=AUTO,DLCFGFILE1=AUTO,VOIPALLOWED=VEIP;
ED-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}:::::IS;
ENT-ONTCARD::ONTCARD-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}:::VEIP,1,0::IS;
ENT-LOGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::;
ED-ONTVEIP::ONTVEIP-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::::IS;
SET-QOS-USQUEUE::ONTL2UNIQ-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1-0::::USBWPROFNAME=HSI_1G_UP;
SET-VLANPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::MAXNUCMACADR=4,CMITMAXNUMMACADDR=1;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::0,${verificarVLAN(ONU.getOnuPosArr(), OLT)}:PORTTRANSMODE=SINGLETAGGED;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::0,:PORTTRANSMODE=SINGLETAGGED;

ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-1::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_CT-COM_WANGponLinkConfig.VLANIDMark,PARAMVALUE=${verificarVLAN(ONU.getOnuPosArr(), OLT)};
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-2::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username,PARAMVALUE="${ONU.getUser()}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-3::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password,PARAMVALUE="${ONU.getPassword()}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-8::::PARAMNAME=InternetGatewayDevice.X_Authentication.WebAccount.Password,PARAMVALUE="dwp@ssw0rd";
`
        } else {
            return `ENT-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}::::DESC1="${ONU.getONUModelAuto()}",DESC2="COD.${ONU.getClientID()}",SERNUM=${ONU.getSerial()},SWVERPLND=DISABLED;
ED-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}:::::IS;
ENT-ONTCARD::ONTCARD-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}:::VEIP,1,0::IS;
ENT-LOGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::;
ED-ONTVEIP::ONTVEIP-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::::IS;
SET-QOS-USQUEUE::ONTL2UNIQ-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1-0::::USBWPROFNAME=HSI_1G_UP;
SET-VLANPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::MAXNUCMACADR=32,CMITMAXNUMMACADDR=1;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::0,${verificarVLAN(ONU.getOnuPosArr(), OLT)}:PORTTRANSMODE=SINGLETAGGED;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}-${ONU.getOnuVeip()}-1:::0,:PORTTRANSMODE=SINGLETAGGED;    
`
        }

    }

    if (OLT == "SV" || OLT == "SB1" || OLT == "SB2" || OLT == "SB3" || OLT == "PQ1" || OLT == "PQ2" || OLT == "VSC" || OLT == "STM" || OLT == "SAM" || OLT == "NP") {
        return `en
conf t
int gpon ${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
onu fix ${ONU.getOnuPosArr()[2]}
onu-profile ${ONU.getOnuPosArr()[2]} ${generateVLANProfile(ONU)}
onu description ${ONU.getOnuPosArr()[2]} cod.${ONU.getClientID()}
wr mem
`
    }
    
    if (OLT == "XV") {
        return `en
conf t
gpon
gpon-olt ${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
onu fix ${ONU.getOnuPosArr()[2]}
onu-profile ${ONU.getOnuPosArr()[2]} ${generateVLANProfile(ONU)}
onu description ${ONU.getOnuPosArr()[2]} cod.${ONU.getClientID()}
wr mem
`
    }

    if (OLT == "PK1" || OLT == "PK2" || OLT == "PK3" || OLT == "PK4" || OLT == "PK5" || OLT == "PK7") {
        if (ONU.isBridge()) {
            return `conf t
int gpon${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
onu add serial-number ${ONU.getSerialLower()}
onu ${ONU.getSerialLower()} flow-profile ${generateVLANProfile(ONU)}
onu ${ONU.getSerialLower()} vlan-translation-profile _${verificarVLAN(ONU.getOnuPosArr(), OLT)} uni-port 1
onu ${ONU.getSerialLower()} alias cod.${ONU.getClientID()}
do copy running-config startup-config`
        } else {
            return `conf t
int gpon${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
onu add serial-number ${ONU.getSerialLower()}
onu ${ONU.getSerialLower()} flow-profile ${generateVLANProfile(ONU)}
onu ${ONU.getSerialLower()} alias cod.${ONU.getClientID()}
do copy running-config startup-config`
        }
    }
}

function generateUnprovCode(OLT, ONU) {
    if (OLT == 'HL') {
        return `configure equipment ont interface 1/1/${ONU.getOnuPos()} admin-state down
configure equipment ont no interface 1/1/${ONU.getOnuPos()}
exit all`
    }
    if (OLT == 'AM') {
        return `ED-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}:::::OOS;
DLT-ONT::ONT-1-1-${ONU.getOnuPosArr()[0]}-${ONU.getOnuPosArr()[1]}-${ONU.getOnuPosArr()[2]}::;
        `
    }
    if (OLT == "SV" || OLT == "SB1" || OLT == "SB2" || OLT == "SB3" || OLT == "PQ1" || OLT == "PQ2" || OLT == "VSC" || OLT == "STM" || OLT == "SAM" || OLT == "NP") {
        return `en
conf t
int gpon ${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
no onu ${ONU.getOnuPosArr()[2]}
wr mem
`
    }
    if (OLT == "XV") {
        return `en
conf t
gpon
gpon-olt ${ONU.getOnuPosArr()[0]}/${ONU.getOnuPosArr()[1]}
no onu ${ONU.getOnuPosArr()[2]}
wr mem
`
    }
}

class OnuDataEntry {
    constructor() {
        this.serial = document.getElementById('serial');
        this.onuPos = document.getElementById('ont').value;
        this.model = document.getElementById('models');
        this.clientID = document.getElementById('clientID');
        this.fibron = document.getElementById('fibron');
        this.OLT = document.getElementById('olt');
        this.userPPPoE = document.getElementById('userPPP');
        this.senhaPPPoE = document.getElementById('senhaPPP');
        this.routerMode = document.getElementById('router');
        this.circ = document.getElementById('circuito');
        this.cto = document.getElementById('cto');
        this.bridgeMode = document.getElementById('bridge');
        this.canal24 = document.getElementById('canal2_4');
        this.canal5 = document.getElementById('canal5');
    }

    getCanal2() {
        return this.canal24.value;
    }

    getCanal5() {
        return this.canal5.value;
    }

    getSerial(){
        return this.serial.value.toUpperCase();
    }

    getSerialLower(){
        return this.serial.value.toLowerCase();
    }

    getSerialSplit() {
        return  this.getSerial().slice(0,4) + ':' + this.getSerial().slice(4, this.serial.length);
    }

    getOnuPos() {
        return this.onuPos;
    }

    getOnuPosArr() {
        return this.getOnuPos().split("/");
    }

    getModel() {
        return this.model.value;
    }

    getCirc() {
        if (this.circ.value) {
            if (this.circ.value.length == 1) {
                return "0" + this.circ.value;
            } else {
                return this.circ.value;
            }
        }
        return "xx"
    }

    getCTO() {
        if (this.cto.value) {
            if (this.cto.value.length == 1) {
                return "0" + this.cto.value;
            } else {
                return this.cto.value;
            }
        }
        return "xx"
    }

    getClientID(){
        return this.clientID.value;
    }

    getOnuVeip() {
        return verifyModelVeip(this);
    }

    getOLT() {
        if (typeof(this.OLT) === "string") {
            return this.OLT;
        } else {
            return this.OLT.value;
        }
    }

    setOLT(OLT) {
        this.OLT = OLT;
    }

    getUser() {
        return this.userPPPoE.value;
    }

    getPassword(){
        return this.senhaPPPoE.value;
    }

    getONUModelAuto() {
        return identifyONUModel(this.getSerial());
    }

    isFibron() {
        return this.fibron.checked;
    }

    isRouter() {
        return this.routerMode.checked;
    }

    isBridge() {
        return this.bridgeMode.checked;
    }

}

function generateVLANProfile(ONUobj) {
    if (ONUobj.getOLT() == "PK1" || ONUobj.getOLT() == "PK2" || ONUobj.getOLT() == "PK3" || ONUobj.getOLT() == "PK4" || ONUobj.getOLT() == "PK5" || ONUobj.getOLT() == "PK7") {

        // Gerando Profile Huaweii
        if (ONUobj.getSerial().slice(0, 4) == "HWTC") {
            return `HUAWEI_PON${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`;
        }

        
        // Gerando Profile Parks Router
        if (ONUobj.getSerial().slice(0, 4) == "PRKS" && !ONUobj.isBridge() || ONUobj.getSerial().slice(0, 4) == "TDTC" && !ONUobj.isBridge()) {

            // PARKS 101 ROUTER
            if (ONUobj.getSerial().slice(4, 7) == "00B" && ONUobj.getOLT() == "PK7") {
                return `ROUTER_101_PON${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
            } else if (ONUobj.getOLT() == "PK7") {      //PARKS 410 NORMAL PK7
                return `ROUTER_410_PON${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
            }
            return `onu_101_router_gpon${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
        }

        // Gerando Profile Parks Bridge
        if (ONUobj.getSerial().slice(0, 4) == "PRKS" || ONUobj.getSerial().slice(0, 4) == "TDTC" && ONUobj.isBridge()) {

            // PARKS 101 BRIDGE PK7
            if (ONUobj.getSerial().slice(4, 7) == "00B" && ONUobj.getOLT() == "PK7") {
                return `BRIDGE_101_1_PON${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
            } else if (ONUobj.getOLT() == "PK7") {      //PARKS 410 NORMAL  PK7
                return `ROUTER_410_PON${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
            }
            // PARKS BRIDGE DEMAIS OLT
            return `flow_onu_101_bridge_gpon${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT()).slice(1)}`
        }
    }

    let profile = `VLAN${verificarVLAN(ONUobj.getOnuPosArr(), ONUobj.getOLT())}-${identifyONUModel(ONUobj.getSerial())}`
    if (ONUobj.isRouter()) {
        return profile + "R";
    }
    return profile;
}

function identifyONUModel(serial) {
    if (serial.slice(0, 4) == "FIOG") {
        return "100"
    } else if (serial.slice(0, 4) == "PRKS") {
        return "PARKS-411"
    } else if (serial.slice(0, 4) == "FRKW") {

        if (serial.slice(4, 6) == "23" || serial.slice(4, 6) == "27") {
            return "630"
        } else if (serial.slice(4, 6) == "15" || serial.slice(4, 6) == "11" || serial.slice(4, 6) == "21") {
            return "420"
        }

    } else if (serial.slice(0, 4) == "ALCL") {
        if (serial.slice(4, 6) == "FB") {
            return "G-140W-H";
        }
        if (serial.slice(4, 6) == "B3" || serial.slice(4, 6) == "B2") {
            return "G-2425G-A"
        }
        if (serial.slice(4, 6) == "FC") {
            return "G-1425G-A";
        }
    } else if (serial.slice(0, 4) == "HWTC"){
        return "EG8145V5"
    } else if (serial.slice(0, 4) == "GPON") {
        return "1200GMFXF"
    } else {
        return "undefined";
    }
}

function verifyModelVeip(objONU) {
        
    if (objONU.getOLT() == "HL" && objONU.isFibron()) {
        return 1;
    }

    let serialInit = objONU.getSerial().slice(0,4);
    
    if (serialInit == "MSTC" || serialInit == "YHTC" 
    || serialInit == "TLCM" || serialInit == "GPON" 
    || serialInit == "CIOT" || serialInit == "NBEL" 
    || serialInit == "ASKY" || serialInit == "HWTC"
    || serialInit == "TDTC") {
        return 6;
    } else if (serialInit == "FRKW") {
        return 4
    } else if (serialInit == "PRKS"){
        return 7;
    } else if (serialInit == "ALCL") {
        return 14;
    } else if (serialInit == "INVP") {
        return 1;
    }
}

function verificarVLAN(ontArr, OLT) { // 516
    let placa = parseInt(ontArr[0]);
    let porta = parseInt(ontArr[1]);
    let base;

    if (OLT == "PK1" || OLT == "PK2" || OLT == "PK3" || OLT == "PK4" || OLT == "PK5" || OLT == "PK7") {
        return `${OLT[2]}` + `${placa}` + `${porta}`
    }
    
    if (OLT == "HL") {
        switch (placa) {
            case 1:
                base = 599;
                break;
            case 2:
                base = 615;
                break;
            case 3:
                base = 699;
                break;
            case 4:
                base = 715;
                break;
            case 5:
                base = 799;
                break;
            case 6:
                base = 815;
                break;
            case 7:
                base = 899;
                break;
            case 8:
                base = 915;
                break;
        }
    } 
    
    if (OLT == "AM") {
        switch (placa) {
            case 1:
                base = 919;
                break;
            case 2:
                base = 935;
                break;
            case 3:
                base = 951;
                break;
            case 4:
                base = 967;
                break;
            case 5:
                base = 599;
                break;
            case 6:
                base = 615;
                break;
            case 7:
                base = 699;
                break;
            case 8:
                base = 715;
                break;
        }
    } 
    
    if (OLT == "PB") {
        switch (placa) {
            case 1:
                base = 726;
                break;
            case 2:
                base = 742;
                break;
            case 3:
                base = 758;
                break;
            case 4:
                base = 774;
                break;
            case 5:
                base = 790;
                break;
            case 6:
                base = 806;
                break;
            case 7:
                base = 822;
                break;
            case 8:
                base = 838;
                break;
        }
    } 
    
    if (OLT == "XV") {
        return `${placa}` + `${porta}`;
    } 
    
    if (OLT == "SB1") {
        switch (placa) {
            case 1:
                base = 1500;
                break;
            case 2:
                base = 1600;
                break;
            case 3:
                base = 1700;
                break;
            case 4:
                base = 1800;
                break;
            case 5:
                base = 1900;
                break;
            case 6:
                base = 2000;
                break;
            case 7:
                base = 2100;
                break;
            case 8:
                base = 2200;
                break;
        }
    } 
    
    if (OLT == "SB2") {
        switch (placa) {
            case 1:
                base = 1616;
                break;
            case 2:
                base = 1632;
                break;
            case 3:
                base = 1648;
                break;
            case 4:
                base = 1664;
                break;
            case 5:
                base = 1680;
                break;
            case 6:
                base = 1696;
                break;
            case 7:
                base = 1712;
                break;
            case 8:
                base = 1728;
                break;
        }
    } 
    
    if (OLT == "SB3") {
        switch (placa) {
            case 1:
                base = 1649;
                break;
            case 2:
                base = 1665;
                break;
            case 3:
                base = 1681;
                break;
            case 4:
                base = 1697;
                break;
            case 5:
                base = 1713;
                break;
            case 6:
                base = 1729;
                break;
            case 7:
                base = 1735;
                break;
            case 8:
                base = 1751;
                break;
        }
    } 
    
    if (OLT == "PQ1") {
        switch (placa) {
            case 1:
                base = 1200;
                break;
            case 2:
                base = 1300;
                break;
            case 3:
                base = 1400;
                break;
            case 4:
                base = 1500;
                break;
            case 5:
                base = 1600;
                break;
            case 6:
                base = 1700;
                break;
            case 7:
                base = 1800;
                break;
            case 8:
                base = 1900;
                break;
        }
    } 
    
    if (OLT == "PQ2") {
        switch (placa) {
            case 1:
                base = 1681;
                break;
        }
    }  
    
    if (OLT == "VSC") {
        switch (placa) {
            case 1:
                base = 1000;
                break;
            case 2:
                base = 1016;
                break;
            case 3:
                base = 1032;
                break;
            case 4:
                base = 1048;
                break;
            case 5:
                base = 1064;
                break;
            case 6:
                base = 1080;
                break;
            case 7:
                base = 1096;
                break;
            case 8:
                base = 1112;
                break;
        } 
    } 
    
    if (OLT == "VSC") {
        switch (placa) {
            case 1:
                base = 1000;
                break;
            case 2:
                base = 1016;
                break;
            case 3:
                base = 1032;
                break;
            case 4:
                base = 1048;
                break;
            case 5:
                base = 1064;
                break;
            case 6:
                base = 1080;
                break;
            case 7:
                base = 1096;
                break;
            case 8:
                base = 1112;
                break;
        }
    }  
    
    if (OLT == "STM") {
        if (porta < 5) {
            switch (placa) {
                case 1:
                    base = 110;
                    break;
                case 2:
                    base = 510;
                    break;
                case 3:
                    base = 910;
                    break;
                case 4:
                    base = 1310;
                    break;
                case 5:
                    base = 1710;
                    break;
                case 6:
                    base = 2110;
                    break;
                case 7:
                    base = 2510;
                    break;
                case 8:
                    base = 2910;
                    break;
            }       
        } else if (porta < 9) {
            switch (placa) {
                case 1:
                    base = 210;
                    break;
                case 2:
                    base = 610;
                    break;
                case 3:
                    base = 1010;
                    break;
                case 4:
                    base = 1410;
                    break;
                case 5:
                    base = 1810;
                    break;
                case 6:
                    base = 2210;
                    break;
                case 7:
                    base = 2610;
                    break;
                case 8:
                    base = 3010;
                    break;
            }       
        } else if (porta < 12) {
            switch (placa) {
                case 1:
                    base = 310;
                    break;
                case 2:
                    base = 710;
                    break;
                case 3:
                    base = 1110;
                    break;
                case 4:
                    base = 1510;
                    break;
                case 5:
                    base = 1910;
                    break;
                case 6:
                    base = 2310;
                    break;
                case 7:
                    base = 2710;
                    break;
                case 8:
                    base = 3110;
                    break;
            }
        } else {
            switch (placa) {
                case 1:
                    base = 410;
                    break;
                case 2:
                    base = 810;
                    break;
                case 3:
                    base = 1210;
                    break;
                case 4:
                    base = 1610;
                    break;
                case 5:
                    base = 2010;
                    break;
                case 6:
                    base = 2410;
                    break;
                case 7:
                    base = 2810;
                    break;
                case 8:
                    base = 3210;
                    break;
            }
        }
    } 
    
    if (OLT == "SAM") {
        switch (placa) {
            case 1:
                base = 820;
                break;
            case 2:
                base = 836;
                break;
            case 3:
                base = 852;
                break;
            case 4:
                base = 868;
                break;
            case 5:
                base = 884;
                break;
            case 6:
                base = 900;
                break;
            case 7:
                base = 916;
                break;
            case 8:
                base = 932;
                break;
        }
    }  
    
    if (OLT == "NP") {
        switch (placa) {
            case 1:
                base = 2010;
                break;
            case 2:
                base = 2026;
                break;
            case 3:
                base = 2042;
                break;
            case 4:
                base = 2058;
                break;
            case 5:
                base = 2074;
                break;
            case 6:
                base = 2090;
                break;
            case 7:
                base = 2106;
                break;
            case 8:
                base = 2122;
                break;
        }
    } 
    
    if (OLT == "SV") {
        if (porta < 5) {
            switch (placa) {
                case 1:
                    base = 600;
                    break;
                case 2:
                    base = 1000;
                    break;
                case 3:
                    base = 1400;
                    break;
                case 4:
                    base = 1800;
                    break;
                case 5:
                    base = 2200;
                    break;
                case 6:
                    base = 2600;
                    break;
                case 7:
                    base = 3000;
                    break;
                case 8:
                    base = 3400;
                    break;
            }       
        } else if (porta < 9) {
            switch (placa) {
                case 1:
                    base = 700;
                    break;
                case 2:
                    base = 1100;
                    break;
                case 3:
                    base = 1500;
                    break;
                case 4:
                    base = 1900;
                    break;
                case 5:
                    base = 2300;
                    break;
                case 6:
                    base = 2700;
                    break;
                case 7:
                    base = 3100;
                    break;
                case 8:
                    base = 3500;
                    break;
            }       
        } else if (porta < 12) {
            switch (placa) {
                case 1:
                    base = 800;
                    break;
                case 2:
                    base = 1200;
                    break;
                case 3:
                    base = 1600;
                    break;
                case 4:
                    base = 2000;
                    break;
                case 5:
                    base = 2400;
                    break;
                case 6:
                    base = 2800;
                    break;
                case 7:
                    base = 3200;
                    break;
                case 8:
                    base = 3600;
                    break;
            }
        } else {
            switch (placa) {
                case 1:
                    base = 900;
                    break;
                case 2:
                    base = 1300;
                    break;
                case 3:
                    base = 1700;
                    break;
                case 4:
                    base = 2100;
                    break;
                case 5:
                    base = 2500;
                    break;
                case 6:
                    base = 2900;
                    break;
                case 7:
                    base = 3300;
                    break;
                case 8:
                    base = 3700;
                    break;
            }
        }
    }

    return base + porta;
}

function writeScript(code) {
    let scriptArea = document.getElementById("txtarea");
    scriptArea.value = code;
}

function setButtonVisibility(visibility) {
    document.getElementById('copy').style.visibility = visibility;
}

function copyText() {
    document.getElementById("txtarea").select();
    document.execCommand('copy');
    window.alert("Copiado para a área de tranferencia.");
}