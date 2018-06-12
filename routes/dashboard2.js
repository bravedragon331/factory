var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var dashboard = require('../controller/dashboard/dashboard');

router.get('/', auth.requireLogin, auth.requireRole(22), dashboard.dashboard2);
router.post('/fabric', auth.requireLogin, dashboard.customer_fabric_data);
router.post('/print', auth.requireLogin, dashboard.customer_print_data);
router.post('/cut', auth.requireLogin, dashboard.customer_cut_data);
router.post('/shipment_range', auth.requireLogin, dashboard.customer_shipment_data);
router.post('/finish', auth.requireLogin, dashboard.customer_finish_data);
router.post('/material', auth.requireLogin, dashboard.customer_material_data);
router.post('/wash', auth.requireLogin, dashboard.customer_wash_data);
router.post('/inspection', auth.requireLogin, dashboard.customer_inspection_data);
router.post('/production', auth.requireLogin, dashboard.customer_production_data);
router.post('/metadata', auth.requireLogin, dashboard.customer_metadata_data);
module.exports = router;