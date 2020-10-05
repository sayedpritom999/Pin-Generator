const getElement = id => document.getElementById(id);
getOutput = () => {
    return getElement('output-value').value;
}

const iterateAndAddEventListener = (className) => {
    const element = document.getElementsByClassName(className);
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', () => {
            if(className == 'number') {
                let el = element[i].innerText;
                getElement('output-value').value += el;
            }
            else if(className == 'operator') {
                let output = getOutput();
                if(element[i].innerText == '<') {
                    output = output.substr(0,output.length-1);
                    getElement('output-value').value = output;
                }
                else if(element[i].innerText == 'C') {
                    getElement('output-value').value = "";
                }
            }
        })
    }
}

iterateAndAddEventListener('number');
iterateAndAddEventListener('operator');

getElement("generate-pin-btn").addEventListener('click', () => { 
    let pin = Math.round(Math.random()*9999);
    getElement('generated-pin-output').value = pin;
})

getElement('submit-btn').addEventListener('click', () => {
    let pin = getElement('generated-pin-output').value;
    let enteredPin = getOutput();
    if(enteredPin == pin && getElement('try-number').innerText != '0') {
        getElement('pin-matched').style.visibility = 'visible';
        getElement("pin-didn't-match").style.visibility = 'hidden';
    }
    else {
        getElement('pin-matched').style.visibility = 'hidden';
        getElement("pin-didn't-match").style.visibility = 'visible';
        let NumberOfTryLeft = getElement('try-number').innerText;
        if(NumberOfTryLeft > 0) {
            NumberOfTryLeft--;
        }
        getElement('try-number').innerText = NumberOfTryLeft;
        if(NumberOfTryLeft < 1) {
            getElement('submit-btn').innerText = "Failed!";
            getElement('submit-btn').style.backgroundColor = "red";
        } 
    }
})