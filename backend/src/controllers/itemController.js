import mongoose from "mongoose";
import { Item } from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const { itemName, description, type, category, location, date, contactInfo } = req.body;

    if (!itemName || !description || !type || !category || !location || !date || !contactInfo) {
      return res.status(400).json({ message: "All item fields are required." });
    }

    const item = await Item.create({
      itemName,
      description,
      type,
      category,
      location,
      date,
      contactInfo,
      user: req.user._id,
    });

    const populatedItem = await item.populate("user", "name email");
    return res.status(201).json(populatedItem);
  } catch (error) {
    return res.status(500).json({ message: "Server error while adding item." });
  }
};

export const getItems = async (_req, res) => {
  try {
    const items = await Item.find().populate("user", "name email").sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching items." });
  }
};

export const getItemById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID." });
    }

    const item = await Item.findById(req.params.id).populate("user", "name email");
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching item." });
  }
};

export const updateItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID." });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can update only your own items." });
    }

    const fields = ["itemName", "description", "type", "category", "location", "date", "contactInfo"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();
    const populatedItem = await item.populate("user", "name email");
    return res.status(200).json(populatedItem);
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating item." });
  }
};

export const deleteItem = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID." });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can delete only your own items." });
    }

    await item.deleteOne();
    return res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting item." });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { name = "", category = "" } = req.query;

    const filters = {};

    if (name) {
      filters.itemName = { $regex: name, $options: "i" };
    }

    if (category) {
      filters.category = { $regex: category, $options: "i" };
    }

    const items = await Item.find(filters).populate("user", "name email").sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Server error while searching items." });
  }
};
