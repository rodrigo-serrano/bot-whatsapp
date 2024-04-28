{
    global.fs = require('fs');
    global.sessionPath = `${__basedir}/store/session.json`;

    if (!fs.existsSync(sessionPath)) {
        let file = fs.openSync(sessionPath, 'w')
        fs.writeSync(file, '[]');
        fs.closeSync(file);
    }
}