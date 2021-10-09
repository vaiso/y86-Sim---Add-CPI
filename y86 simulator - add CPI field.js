// ==UserScript==
// @name         y86 simulator - add CPI field
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a CPI field to the y86 simulator
// @author       You
// @match        https://www.students.cs.ubc.ca/~cs-313/simulator/?arch=y86*
// @icon         https://www.google.com/s2/favicons?domain=ubc.ca
// @grant        none
// ==/UserScript==

let lastCpi = 0;

const main = () => {
    'use strict';

    initializeNode();
    setInterval(onUpdate, 1000); // polling is a little gross but for some reason mutation observers won't work properly :/
}

const initializeNode = () => {
    const header = document.getElementsByClassName('top')[0];

    const wrapper = document.createElement('span');
    wrapper.style = "white-space: nowrap;";

    const label = document.createElement('label');
    label.for = 'cpi';
    label.innerText = 'CPI: ';

    const cpiNode = document.createElement('input');
    cpiNode.value = 0;
    cpiNode.type = 'number';
    cpiNode.id = 'cpi';
    cpiNode.disabled = true;

    wrapper.appendChild(label);
    wrapper.appendChild(cpiNode);
    header.appendChild(wrapper);
}

const onUpdate = () => {
    const clockct = document.getElementById('clockct').value;
    const retInstr = document.getElementById('retinstr').value;

    if (retInstr > 0) {
        let cpi = clockct / retInstr;
        if (lastCpi !== cpi) {
            document.getElementById('cpi').value = cpi.toFixed(2);
            lastCpi = cpi;
            console.log('cpi updated');
        }
    }
}

main();

