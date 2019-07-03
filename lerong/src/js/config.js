require.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/jquery-1.11.3.min',
        header: 'js/module/header',
        footer: 'js/module/footer',
        template: 'libs/art-template/template-web',
        url: 'js/module/url',
        zoom: 'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
        fly: 'libs/jquery-plugins/jquery.fly'
    },
    //垫片
    shim: {
        zoom: {
            deps: ['jquery']
        },
        fly: {
            deps: ['jquery']
        }
    }
})