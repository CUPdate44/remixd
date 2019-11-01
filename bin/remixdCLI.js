#!/usr/bin/env node
let origins = require('../public/origins').origins;

//Commander part
const program = require('commander');

program
    .usage('[options]')
    .description('Provide a two-way connection between the local computer and Remix IDE')
    .option('--remix-ide  <url>', 'URL of remix instance allowed to connect to this web socket connection', 'https://remix.ethereum.org')
    .option('-s, --shared-folder <path>', 'Folder to share with Remix IDE')
    .option('--read-only', 'Treat shared folder as read-only (experimental)')
    .option('--forward-commands', 'Enables CLI commands forwarding')
    .option('--permissions <path>', 'What permissions are allowed')
    .on('--help', function () {
        console.log('\nExample:\n\n    remixd -s ./ --remix-ide http://localhost:8080\n')
    }).parse(process.argv)

console.log('\x1b[33m%s\x1b[0m', '[WARN] You may now only use IDE at ' + program.remixIde + ' to connect to this instance');

if (program.sharedFolder) {
    process.env.SHARED_FOLDER = program.sharedFolder;
}

if (program.readOnly) {
    process.env.READ_ONLY = true;
}

if(program.remixIde){
    origins.push(program.remixIde);
}

if(program.permissions){
    process.env.PERMISSIONS = program.permissions;
}

process.env.ORIGINS = origins;
require('../src/router');