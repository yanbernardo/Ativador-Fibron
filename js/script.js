
class OLTTextGenerator {
    constructor(OLT, serial, veip, location) {
        this.olt = OLT;
        this.serial = serial;
        this.veip = veip;
        this.location = location;
    }

    
}

function provisionarOLTFurakawa() {
    let OLT = document.getElementById('olt').value;
    let dados = new InputProv();
    let ontArr = dados.getOnt().split("/");


    let codeFRKW = `en
conf t
gpon
gpon-olt ${ontArr[0]}/${ontArr[1]}
onu fix ${ontArr[2]}
onu-profile ${ontArr[2]} VLAN54-420R
onu description ${ontArr[2]} cod.${dados.getID()}
wr mem
`
}



function provisionarOLTNokiaCLI() {
    
    let dados = new InputProv();

    let isFibron = document.getElementById('fibron').checked;

    let ontArr = dados.getOnt().split("/");

    let vlan = verificarVLAN(ontArr, 'HL');
    let veip = verifyModelVeip();

    

    if (isFibron) {
        veip = 1;
    }

    let code = `configure equipment ont interface 1/1/${dados.getOnt()} sw-ver-pland disabled sernum ${dados.getSerialSplit()} cvlantrans-mode local fec-up enable enable-aes enable voip-allowed veip desc1 ${dados.getModel()} desc2 COD.${dados.getID()}
configure equipment ont interface 1/1/${dados.getOnt()} admin-state up
configure equipment ont slot 1/1/${dados.getOnt()}/1 planned-card-type 10_100base plndnumdataports 1 plndnumvoiceports 0 admin-state up
configure qos interface ont:1/1/${dados.getOnt()} us-num-queue 4
configure interface port uni:1/1/${dados.getOnt()}/${veip}/1 admin-up link-updown-trap
configure ethernet ont 1/1/${dados.getOnt()}/${veip}/1 auto-detect 10_100_1000baset-auto
configure ethernet ont 1/1/${dados.getOnt()}/${veip}/1 admin-state up
configure qos interface 1/1/${dados.getOnt()}/${veip}/1 queue 0 priority 5 weight 0 shaper-profile name:1G
configure qos interface 1/1/${dados.getOnt()}/${veip}/1 upstream-queue 0 priority  1 bandwidth-profile name:1G
configure bridge port 1/1/${dados.getOnt()}/${veip}/1 max-unicast-mac 4
configure bridge port 1/1/${dados.getOnt()}/${veip}/1 vlan-id 100 tag single-tagged l2fwder-vlan ${vlan} vlan-scope local
exit all
admin save
admin software-mngt ihub database save-protected
exit all`;
    
    dados.setTxtArea(code);
    dados.setButtonStatus("visible");
    
}

function provisionarOLTNokiaTLI() {
    let OLT = document.getElementById('olt').value;
    let dados = new InputProv();
    let ontArr = dados.getOnt().split("/");

    let code = `ENT-ONT::ONT-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}::::DESC1="${dados.getModel()}",DESC2="COD.${dados.getID()}",SERNUM=${dados.getSerial()},SWVERPLND=DISABLED;
ED-ONT::ONT-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}:::::IS;
ENT-ONTCARD::ONTCARD-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}:::VEIP,1,0::IS;
ENT-LOGPORT::ONTL2UNI-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1:::;
ED-ONTVEIP::ONTVEIP-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1:::::IS;
SET-QOS-USQUEUE::ONTL2UNIQ-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1-0::::USBWPROFNAME=HSI_1G_UP;
SET-VLANPORT::ONTL2UNI-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1:::MAXNUCMACADR=32,CMITMAXNUMMACADDR=1;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1:::0,${verificarVLAN(ontArr, OLT)}:PORTTRANSMODE=SINGLETAGGED;
ENT-VLANEGPORT::ONTL2UNI-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-${verifyModelVeip()}-1:::0,:PORTTRANSMODE=SINGLETAGGED;    
`;

if (dados.getSerial().slice(0,4) == "ALCL" && (userPPP.value != "" && senhaPPP.value != "")) {
    code += `ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-1::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_CT-COM_WANGponLinkConfig.VLANIDMark,PARAMVALUE=${verificarVLAN(ontArr, OLT)};
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-2::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username,PARAMVALUE="${userPPP.value}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${ontArr[0]}-${ontArr[1]}-${ontArr[2]}-3::::PARAMNAME=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password,PARAMVALUE="${senhaPPP.value}";
`
}

    dados.setTxtArea(code);
    dados.setButtonStatus("visible");
    
}

class InputProv {
    constructor() {
        this.serial = document.getElementById('serial').value;
        this.ont = document.getElementById('ont').value;
        this.model = document.getElementById('models').value;
        this.ID = document.getElementById('clientID').value;
        this.writeSpace = document.getElementById("txtarea");
        this.copyButton = document.getElementById("copy");
    }

    getSerial(){
        return this.serial;
    }

    getSerialSplit() {
        return  this.serial.slice(0,4) + ':' + this.serial.slice(4, this.serial.length);
    }

    getOnt() {
        return this.ont;
    }

    getModel() {
        return this.model;
    }

    getID(){
        return this.ID;
    }

    getTxtArea() {
        return this.writeSpace;
    }

    setTxtArea(code) {
        this.writeSpace.value = code;
    }

    getCopyButton() {
        return this.copyButton;
    }

    setButtonStatus(status) {
        this.copyButton.style.visibility = status;
    }

}

function copyText() {
    let textCopy = document.getElementById("txtarea");
    
    textCopy.select();

    document.execCommand('copy');
    window.alert("Copiado para a área de tranferencia.");
}

function verifyModelVeip() {
    let inicioSerial = document.getElementById('serial').value.slice(0,4);
    
    if (inicioSerial == "MSTC" || inicioSerial == "YHTC" 
    || inicioSerial == "TLCM" || inicioSerial == "GPON" 
    || inicioSerial == "CIOT" || inicioSerial == "NBEL" 
    || inicioSerial == "ASKY" || inicioSerial == "HWTC") {
        return 6;
    } else if (inicioSerial == "FRKW") {
        return 4
    } else if (inicioSerial == "PRKS"){
        return 7;
    } else if (inicioSerial == "ALCL") {
        return 14;
    } else if (inicioSerial == "INVP") {
        return 1;
    }
}

function verificarVLAN(ontArr, OLT) {
    let placa = parseInt(ontArr[0]);
    let porta = parseInt(ontArr[1]);
    let base;
    
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
                base = 983;
                break;
            case 6:
                base = 999;
                break;
            case 7:
                base = 1015;
                break;
            case 8:
                base = 1031;
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