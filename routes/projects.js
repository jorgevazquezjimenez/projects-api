const { Router } = require('express');
const { check } = require('express-validator')

const {
    projectsGet,
    projectsPost,
    projectsPut,
    projectsDelete
} = require('../controllers/projects');

const router = Router()

// Endpoints
router.get('/', projectsGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('status', 'El estado es obligatorio').not().isEmpty(),
], projectsPost);

router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
], projectsPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], projectsDelete);

module.exports = router;