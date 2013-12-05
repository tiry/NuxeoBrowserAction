window.addEvent("domready", function () {

    
    new FancySettings.initWithManifest(function (settings) {
        alert("init settings ");
        console.log(settings);
        settings.manifest.testConnection.addEvent("action", function () {
            console.log(settings);
            alert("You clicked me!");
        });
    });
    
});
