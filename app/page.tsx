"use client"

import { use, useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  description: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch products from your API route
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

const handleExlcuir = async (id: string) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }

      setProducts((prevProducts) => 
        prevProducts.filter((product) => product.id !== id)
      );

      alert("Excluído com sucesso!");

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unknown error");
      }
    }
  }

  if (loading) return <div className="p-8">Loading products...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600 my-2">{product.description}</p>
            <p className="font-bold text-lg">${product.price}</p>
            <button onClick={() => handleExlcuir(product.id)}className="bg-red-500 text-white py-2 px-4 rounded mt-4">Excluir </button>
          </div>
        ))}
      </div>
    </main>
  )
}

