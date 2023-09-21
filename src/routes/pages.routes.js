const express = require('express');
const { getLoginPage, getRegisterPage, getMusicianPage, getOrganizerPage, getChangePasswordPage, getDynamicChangePasswordPage, getEventsPage, getProfilePage, getCreditsPage } = require('../controller/pages.controller');
const router = express.Router();


router.route('/')
    .get(getLoginPage);

router.route('/register')
    .get(getRegisterPage);

router.route('/msc')
    .get(getMusicianPage);

router.route('/org')
    .get(getOrganizerPage);

router.route('/change-password')
    .get(getChangePasswordPage);

router.route('/change-password/:token')
    .get(getDynamicChangePasswordPage); 

router.route('/:typeUser/event')
    .get(getEventsPage);

router.route('/:typeUser/profile')
    .get(getProfilePage);

router.route('/:typeUser/credits')
    .get(getCreditsPage);

module.exports = router;

