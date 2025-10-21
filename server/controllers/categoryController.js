import prisma from "../db/db.js";

export async function createCategory(req, res, next) {
  try {

    const createdCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    return res.status(201).json({
      message: "Category created successfully",
      category: createdCategory,
    });
  } catch (error) {
   if (error.code === "P2002") {
      return res.status(409).json({
        message: "product category with this name already exists",
      });
   }
  }
};
  

export async function getAllCategories(req, res) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      totalProductsCount: true,
    },
  });
  return res.status(200).json({
    message: "Categories fetched successfully",
    categories
  });
};

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: req.body
    })

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    throw new Error(error);
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: id },
    });
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Category not found",
      });
    }
  }
}