const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Project = require('../models/project');

// Projects CRUD

const projectsGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, projects] = await Promise.all([
        Project.countDocuments(query),
        Project.find(query)
        .limit(limit)
        .skip(from)
    ]);

    res.json({ total, projects });

}

const projectsGetById = async(req = request, res = response) => {
    const { id } = req.params

    const project = await Project.findById( id )
    res.json(project)
}

const projectsPost = async(req, res = response) => {
    const { name, description, status } = req.body;
    const project = new Project({
        name,
        description,
        status
    });

    await project.save();
    res.json(project);
}

const projectsPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const project = await Project.findOneAndUpdate(id, resto);
    res.json(project);
}

const projectsDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, { status: false });
    res.json(project);
}

// Export the controller
module.exports = {
    projectsGet,
    projectsGetById,
    projectsPost,
    projectsPut,
    projectsDelete
};
