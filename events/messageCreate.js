const bl_strings = require('../data/blacklist_strings.json');
const bl_domains = require('../data/blacklist_domains.json');

const axios = require('axios');
const extractUrls = require('extract-urls');
const urlMetadata = require('url-metadata');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        try {
            const msg = message.content;
            var delFlag = false;

            // [1.] validación del mensaje contra lista de dominios
            bl_domains.forEach((text) => {
                if(msg.includes(text.toLowerCase())) {
                    delFlag = true;
                }
            });

            // [2.] validación del mensaje contra lista de mensajes
            bl_strings.forEach((text) => {
                if(msg.includes(text.toLowerCase())) { delFlag = true; }
            });

            axios.get('https://spen.tk/api/v1/isMaliciousTerm?text='+msg).then((resp) => {
                if(resp.data.hasMatch) { delFlag = true; }
            });


            // [3.] validación de enlaces obtenibles contra API
            let urls = extractUrls(msg);

            if(urls) {
                urls.forEach((url) => {
                    var url = url.toLowerCase();
                    axios.get('https://spen.tk/api/v1/isScamLink?link='+url).then((resp) => {
                        if(resp.data.result) { delFlag = true; }
                    });
                });
            }
            if(delFlag) {
                return message.delete();
            }
        } catch(error) {
            console.log('error: ', error);
        }
    }
}