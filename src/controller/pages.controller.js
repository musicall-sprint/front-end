const path = require('path');

exports.getLoginPage = (req, res) => {
    res.sendFile(path.resolve('./public/auth-login.html'));
}

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.resolve('./public/auth-register.html'));
}

exports.getMusicianPage = (req, res) => {
    res.sendFile(path.resolve('./public/find-events.html'));
}

exports.getOrganizerPage = (req, res) => {
    res.sendFile(path.resolve('./public/find-artist.html'));
}

exports.getChangePasswordPage = (req, res) => {
    res.sendFile(path.resolve('./public/change-password.html'));
}

exports.getDynamicChangePasswordPage = (req, res) => {
    res.sendFile(path.resolve('./public/change-password-dynamic.html'));
}

exports.getEventsPage = (req, res) => {
    const typeUser = req.params.typeUser;
    console.log(typeUser)
    res.sendFile(path.resolve(`./public/dash/${typeUser}/events.html`));
}

exports.getProfilePage = (req, res) => {
    const typeUser = req.params.typeUser;
    console.log(typeUser)
    res.sendFile(path.resolve(`./public/dash/${typeUser}/my-profile.html`));
}

exports.getCreditsPage = (req, res) => {
    const typeUser = req.params.typeUser;
    console.log(typeUser)
    res.sendFile(path.resolve(`./public/dash/${typeUser}/credits.html`));
}

