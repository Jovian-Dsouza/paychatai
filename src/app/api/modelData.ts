import prisma from "@/lib/prisma";   

// Function to delete model data by model_id
export async function deleteModelDataById(model_id) {
  try {
    await prisma.modelData.delete({
      where: { model_id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting model data:", error);
    return { success: false, error: "Error deleting model data" };
  }
}

// Function to get model info by model_id
export async function getModelInfoById(model_id: String) {
  try {
    const modelData = await prisma.modelData.findUnique({
      where: { model_id },
    });
    return modelData;
  } catch (error) {
    console.error("Error retrieving model info:", error);
    return null;
  }
}

// Function to get all model IDs
export async function getAllModelIds() {
  try {
    const modelIds = await prisma.modelData.findMany({
      select: { model_id: true },
    });
    return modelIds.map((data) => data.model_id);
  } catch (error) {
    console.error("Error retrieving model IDs:", error);
    return [];
  }
}

// Function to show all model data
export async function showAllModelData() {
  try {
    const allModelData = await prisma.modelData.findMany();
    return allModelData;
  } catch (error) {
    console.error("Error retrieving model data:", error);
    return [];
  }
}

// Function to insert model data
export async function insertModelData({
  model_id,
  model_did,
  base_model,
  prompt,
  model_name,
  model_desc,
  image_url,
}) {
  try {
    const newData = await prisma.modelData.create({
      data: {
        model_id,
        model_did,
        base_model,
        prompt,
        model_name,
        model_desc,
        image_url,
      },
    });
    return newData;
  } catch (error) {
    console.error("Error inserting model data:", error);
    return null;
  }
}
