// Settings form layout
this.manifest = {
    "name": "Nuxeo Extension for Chrome",
    "icon": "nuxeo.png",
    "settings": [
        {
            "tab": i18n.get("nuxeoAccount"),
            "group": i18n.get("login"),
            "name": "serverUrl",
            "type": "text",
            "label": i18n.get("serverUrl"),
        },
        {
            "tab": i18n.get("nuxeoAccount"),
            "group": i18n.get("login"),
            "name": "username",
            "type": "text",
            "label": i18n.get("login"),
            "text": i18n.get("nuxeoLogin")
        },
        {
            "tab": i18n.get("nuxeoAccount"),
            "group": i18n.get("login"),
            "name": "password",
            "type": "text",
            "label": i18n.get("password"),
            "text": i18n.get("nuxeoPassword"),
            "masked": true
        },
        {
            "tab": i18n.get("nuxeoAccount"),
            "group": i18n.get("login"),
            "name": "testConnection",
            "type": "button",
            "label": i18n.get("testConnection"),
            "text": i18n.get("test")
        },
        {
            "tab": i18n.get("advancedConfig"),
            "group": "nuxeoConfig",
            "name": "nxql",
            "type": "text",
            "label": i18n.get("nxql"),
        },
        {
            "tab": i18n.get("advancedConfig"),
            "group": "nuxeoConfig",
            "name": "docType",
            "type": "text",
            "label": i18n.get("docType"),
        },

    ],
    "alignment": [
        [
            "serverUrl",
            "username",
            "password"
        ],
        [
            "docType"
        ]
    ]
};
