function gerarScriptNomeESenha() {
    let ont = document.getElementById('ont').value;
    const posicao = new PosicaoONT(ont);
    let nomeRede = document.getElementById('nome').value;
    let senhaRede = document.getElementById('senha').value;
    let output = document.getElementById("txtarea");
    
    let script = `DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-4;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-5;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-6;
DLT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-7;

ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-4::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID,PARAMVALUE="${nomeRede}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-5::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.PreSharedKey,PARAMVALUE="${senhaRede}";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-6::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID,PARAMVALUE="${nomeRede} 5G";
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-${posicao.getSlot()}-${posicao.getPon()}-${posicao.getPorta()}-7::::PARAMNAME=InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.PreSharedKey.1.PreSharedKey,PARAMVALUE="${senhaRede}";
`

    output.value = script;
    let copyButton = document.getElementById("copy");
    copyButton.style.visibility = "visible";
}

class PosicaoONT {

    constructor(ont) {
        this.ont = ont;
        this.posArray = ont.split("/") 
    }

    getSlot() {
        return parseInt(this.posArray[0]);
    }

    getPon() {
        return parseInt(this.posArray[1]);
    }

    getPorta() {
        return parseInt(this.posArray[2]);
    }
}

function copyText() {
    let textCopy = document.getElementById("txtarea");
    
    textCopy.select();

    document.execCommand('copy');
    window.alert("Copiado para a área de tranferencia.")
}