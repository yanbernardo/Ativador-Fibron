
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
    } else if (OLT == "AM") {
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
    } else if (OLT == "PB") {
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

    return base + porta;

}