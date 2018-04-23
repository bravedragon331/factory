var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var dashboard = require('../controller/dashboard/dashboard');
var organization = require('../controller/dashboard/organization');
var code = require('../controller/dashboard/code');
var customer = require('../controller/dashboard/customer');
var order = require('../controller/dashboard/order');
var material = require('../controller/dashboard/material');
// Main routes for app
router.get('/', auth.requireLogin, dashboard.index);

router.get('/organization/factory', auth.requireLogin, organization.factory);
router.post('/organization/factory_add', auth.requireLogin, organization.factory_add);
router.post('/organization/factory_update', auth.requireLogin, organization.factory_update);
router.post('/organization/factory_list', organization.factory_list);
router.post('/organization/factory_remove', auth.requireLogin, organization.factory_remove);

router.get('/organization/department', auth.requireLogin, organization.department);
router.post('/organization/department_add', auth.requireLogin, organization.department_add);
router.post('/organization/department_update', auth.requireLogin, organization.department_update);
router.post('/organization/department_list', organization.department_list);
router.post('/organization/department_remove', auth.requireLogin, organization.department_remove);

router.get('/organization/line',  auth.requireLogin, organization.line);
router.post('/organization/line_add', auth.requireLogin, organization.line_add);
router.post('/organization/line_update', auth.requireLogin, organization.line_update);
router.post('/organization/line_list', auth.requireLogin, organization.line_list);
router.post('/organization/line_remove', auth.requireLogin, organization.line_remove);

router.get('/organization/users', auth.requireLogin, organization.users);
router.post('/organization/user_add', auth.requireLogin, organization.user_add);
router.post('/organization/user_auth', auth.requireLogin, organization.user_auth);
router.post('/organization/user_update', auth.requireLogin, organization.user_update);
router.post('/organization/add_auth', auth.requireLogin, organization.add_auth);
router.post('/organization/update_auth', auth.requireLogin, organization.update_auth);
router.post('/organization/remove_auth', auth.requireLogin, organization.remove_auth);

router.get('/codes/yarn', auth.requireLogin, code.yarn);
router.post('/codes/yarn_add', auth.requireLogin, code.yarn_add);
router.post('/codes/yarn_update', auth.requireLogin, code.yarn_update);
router.post('/codes/yarn_remove', auth.requireLogin, code.yarn_remove);

router.get('/codes/fabric', auth.requireLogin, code.fabric);
router.post('/codes/fabric_add', auth.requireLogin, code.fabric_add);
router.post('/codes/fabric_update', auth.requireLogin, code.fabric_update);
router.post('/codes/fabric_remove', auth.requireLogin, code.fabric_remove);

router.get('/codes/submaterial', auth.requireLogin, code.submaterial);
router.post('/codes/submaterial_add', auth.requireLogin, code.submaterial_add);
router.post('/codes/submaterial_update', auth.requireLogin, code.submaterial_update);
router.post('/codes/submaterial_remove', auth.requireLogin, code.submaterial_remove);
router.post('/codes/submaterial_list', auth.requireLogin, code.submaterial_list);

router.get('/codes/others', auth.requireLogin, code.others);
router.post('/codes/others_add', auth.requireLogin, code.others_add);
router.post('/codes/others_update', auth.requireLogin, code.others_update);
router.post('/codes/others_list', auth.requireLogin, code.others_list);
router.post('/codes/other_remove', auth.requireLogin, code.other_remove);

router.get('/customer/new', auth.requireLogin, customer.new);
router.get('/customer/list', auth.requireLogin, customer.list);
router.post('/customer/add', auth.requireLogin, customer.add);
router.post('/customer/update', auth.requireLogin, customer.update);
router.post('/customer/edit', auth.requireLogin, customer.edit);
router.post('/customer/sizegroup_add', auth.requireLogin, customer.sizegroup_add);
router.post('/customer/sizegroup_update', auth.requireLogin, customer.sizegroup_update);
router.post('/customer/sizegroup_remove', auth.requireLogin, customer.sizegroup_remove);
router.post('/customer/sizegroup_list', auth.requireLogin, customer.sizegroup_list);
router.post('/customer/productmaterialgroup_add', auth.requireLogin, customer.productmaterialgroup_add);
router.post('/customer/productmaterialgroup_update', auth.requireLogin, customer.productmaterialgroup_update);
router.post('/customer/productmaterialgroup_remove', auth.requireLogin, customer.productmaterialgroup_remove);
router.post('/customer/productmaterialgroup_list', auth.requireLogin, customer.productmaterialgroup_list);
router.post('/customer/finishmaterialgroup_add', auth.requireLogin, customer.finishmaterialgroup_add);
router.post('/customer/finishmaterialgroup_update', auth.requireLogin, customer.finishmaterialgroup_update);
router.post('/customer/finishmaterialgroup_remove', auth.requireLogin, customer.finishmaterialgroup_remove);
router.post('/customer/finishmaterialgroup_list', auth.requireLogin, customer.finishmaterialgroup_list);
router.post('/customer/follower_add', auth.requireLogin, customer.follower_add);
router.post('/customer/follower_remove', auth.requireLogin, customer.follower_remove);

router.get('/order/list', auth.requireLogin, order.list);
router.get('/order/new', auth.requireLogin, order.new);
router.post('/order/group_list', auth.requireLogin, order.group_list);
router.post('/order/order_add', auth.requireLogin, order.order_add);
router.post('/order/order_remove', auth.requireLogin, order.order_remove);
router.post('/order/order_image_add', auth.requireLogin, order.order_image_add);
router.post('/order/order_detail', auth.requireLogin, order.order_detail);
router.post('/order/order_by_id', auth.requireLogin, order.order_detail_byid);
router.post('/order/order_fabric_add', auth.requireLogin, order.order_fabric_add);
router.post('/order/order_fabric_update', auth.requireLogin, order.order_fabric_update);
router.post('/order/order_fabric_remove', auth.requireLogin, order.order_fabric_remove);
router.post('/order/order_fabric_get', auth.requireLogin, order.order_fabric_get);
router.post('/order/order_fabric_list', auth.requireLogin, order.order_fabric_list);
router.post('/order/order_detail_add', auth.requireLogin, order.order_detail_add);
router.post('/order/order_detail_get', auth.requireLogin, order.order_detail_get);
router.post('/order/order_detail_update', auth.requireLogin, order.order_detail_update);
router.post('/order/order_detail_all', auth.requireLogin, order.order_detail_all);
router.post('/order/order_detail_remove', auth.requireLogin, order.order_detail_remove);


//Material Sub Menu
router.get('/material/in', auth.requireLogin, material.in);
router.get('/material/out', auth.requireLogin, material.out);
router.post('/material/search', auth.requireLogin, material.order_search);
router.post('/material/order_material', auth.requireLogin, material.order_material);
router.post('/material/material_task', auth.requireLogin, material.material_task);
router.post('/material/size_list', auth.requireLogin, material.size_list);

module.exports = router;