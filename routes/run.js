var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var queue_controller = require('../controllers/queueController');

router.get('/queue/list', queue_controller.node_list);

router.get('/queue_header/list', queue_controller.queue_list);

router.get('/queue/count_nodes', queue_controller.count_nodes);

router.get('/queue/user_list/:id_queue/', queue_controller.user_list);

router.get('/queue/enqueue', queue_controller.enqueue);

router.get('/queue/dequeue', queue_controller.dequeue);

router.post('/queue/create_queue', queue_controller.create_queue);

router.get('/queue/delete_queue', queue_controller.delete_queue);

router.get('/users/list', user_controller.user_list);

router.get('/users/id:/detail', user_controller.user_detail);

router.post('/users/create', user_controller.create_user);

router.get('/p', queue_controller.prueba);

module.exports = router;
