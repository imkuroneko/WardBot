module.exports = {
    apps : [{
        name : "WardBot",
        script : "./index.js",

        watch : false,
        max_restarts : 10,

        ignore_watch : [
            'logs/errors.log',
            'logs/out.log'
        ],

        log_date_format : 'YYYY-MM-DD HH:mm:ss',
        error_file : './logs/errors.log',
        out_file   : './logs/out.log'
    }]
}