const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { v4: uuidv4 } = require('uuid');
const Gadget = require('../models/gadget');
const crypto = require('crypto');

router.use(authMiddleware);
// GET 
router.get('/', async (req, res) => 
{
  try 
  {
    const gadgets = await Gadget.findAll();
    const gadgetsWithProbability = gadgets.map(gadget => 
    ({
      ...gadget.toJSON(),
      missionSuccessProbability: Math.floor(Math.random() * 101)
    }));
    res.json(gadgetsWithProbability);
  } 

  catch (error) 
  {
    res.status(500).json({ error: 'Error retrieving gadgets' });
  }
});

// POST
router.post('/', async (req, res) => {
  try 
  {
    const { name } = req.body;
    const codename = `The ${uuidv4().split('-')[0]}`;
    const newGadget = await Gadget.create({ name, codename });
    res.status(201).json(newGadget);
  } 
  catch (error) 
  {
    res.status(400).json({ error: 'Error creating gadget' });
  }
});

// PATCH 
router.patch('/:id', async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const [updated] = await Gadget.update(req.body, { where: { id } });
    if (updated) 
        {
      const updatedGadget = await Gadget.findByPk(id);
      res.json(updatedGadget);
    } 
    else 
    {
      res.status(404).json({ error: 'Gadget non existent!!' });
    }
  } 
    catch (error) 
    {
        res.status(400).json({ error: 'Error updating gadget' });
    }
});

// DELETE 
router.delete('/:id', async (req, res) => 
    {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (gadget) 
    {
      gadget.status = 'Decommissioned';
      gadget.decommissionedAt = new Date();
      await gadget.save();
      res.json({ message: 'Gadget decommissioned successfully!' }); //kindly check this. The timestamp has been generated!!
    } else 
    {
      res.status(404).json({ error: 'Gadget NADA' });
    }
  } catch (error) 
  {
    res.status(400).json({ error: 'Error decommissioning gadget' });
  }
});

// POST SELF-DESTRUCT
router.post('/:id/self-destruct', async (req, res) => {
    try {
      const { id } = req.params;
      const { confirmationCode } = req.body;
  
      const gadget = await Gadget.findByPk(id);
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      const expectedCode = crypto.randomBytes(4).toString('hex');
      
      if (confirmationCode !== expectedCode) {
        return res.status(400).json({ error: 'Invalid confirmation code' });
      }
  
      gadget.status = 'Destroyed';
      await gadget.save();
  
      res.json({ message: 'Gadget self-destruct sequence completed' });
    } catch (error) {
      res.status(500).json({ error: 'Error during self-destruct sequence' });
    }
  });

module.exports = router;
