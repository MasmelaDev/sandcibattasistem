"use server";
import { db } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export const addProduct = async (formData: FormData) => {
  const name = formData.get("name");
  const price = formData.get("price");
  const categoryId = formData.get("categoryId");
  const costo = formData.get("costo");
  try {
    if (name === "") {
      return { error: "P2003" };
    }
    const newProduct = await db.products.create({
      data: {
        name: name as string,
        price: Number(price),
        categoryId: Number(categoryId),
        costo: Number(costo),
      },
    });
    redirect(`/productos?categoria=${categoryId}`);
    return { product: newProduct };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return { error: e.code };
    }
    throw e;
  }
};

export const editProduct = async (formData: FormData) => {
  const name = formData.get("name");
  const price = formData.get("price");
  const costo = formData.get("costo");
  const productId = formData.get("productId");
  const categoryId = formData.get("categoryId");
  const active = formData.get("active");
  try {
    if (name === "" || price === "" || costo === "") {
      return { error: "P2003" };
    }
    const updatedProduct = await db.products.update({
      where: { id: Number(productId) },
      data: {
        name: name as string,
        price: Number(price),
        costo: Number(costo),
        categoryId: Number(categoryId),
        active: active === "true" ? true : false,
      },
    });

    redirect(
      `/productos?categoria=${categoryId}&modo=verProducto&producto=${productId}`
    );
    return { product: updatedProduct };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return { error: e.code };
    }
    throw e;
  }
};

export const editCategory = async (formData: FormData) => {
  const name = formData.get("name");
  const categoryId = formData.get("categoryId");
  try {
    if (name === "") {
      return { error: "P2003" };
    }
    const updatedCategory = await db.categories.update({
      where: { id: Number(categoryId) },
      data: {
        name: name as string,
      },
    });

    redirect(`/productos?categoria=${categoryId}`);
    return { category: updatedCategory };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return { error: e.code };
    }
    throw e;
  }
};
