"use client";

import React from 'react';
import { motion } from "framer-motion";
import { CategoryCard } from '@/components/category/CategoryCard';
import { Category } from '@/types';

interface CategoryCardClientProps {
  categories: Category[];
  error?: string | null;
}

export default function CategoryCardClient({ categories, error }: CategoryCardClientProps) {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Browse by Category
        </h2>
        <p className="text-muted-foreground text-lg">
          Find events that match your interests
        </p>
      </motion.div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-destructive text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No categories available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

