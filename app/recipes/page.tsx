'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';

const recipes = [
    {
        id: 1,
        title: 'Multi-Grain Roti',
        image: '/images/recipe-roti.jpg',
        time: '20 mins',
        difficulty: 'Easy',
        servings: '4',
        ingredients: [
            '2 cups ROSHNI Multi-Grain Flour',
            '1 cup warm water',
            '1 tsp salt',
            '1 tbsp oil',
        ],
        instructions: [
            'Mix flour and salt in a large bowl',
            'Gradually add warm water and knead into soft dough',
            'Add oil and knead for 5 minutes until smooth',
            'Cover and rest for 15 minutes',
            'Divide into equal portions and roll into circles',
            'Cook on hot tawa until golden spots appear on both sides',
            'Serve hot with your favorite curry',
        ],
    },
    {
        id: 2,
        title: 'Homemade Multi-Grain Bread',
        image: '/images/recipe-bread.jpg',
        time: '90 mins',
        difficulty: 'Medium',
        servings: '1 loaf',
        ingredients: [
            '3 cups ROSHNI Multi-Grain Flour',
            '1 cup warm milk',
            '2 tbsp honey',
            '2 tsp active dry yeast',
            '2 tbsp butter',
            '1 tsp salt',
        ],
        instructions: [
            'Activate yeast in warm milk with honey for 10 minutes',
            'Mix flour and salt in a large bowl',
            'Add yeast mixture and melted butter',
            'Knead for 10 minutes until elastic',
            'Let rise in warm place for 1 hour',
            'Shape into loaf and place in greased pan',
            'Let rise again for 30 minutes',
            'Bake at 180°C for 35-40 minutes',
        ],
    },
    {
        id: 3,
        title: 'Stuffed Paratha',
        image: '/images/recipe-paratha.jpg',
        time: '30 mins',
        difficulty: 'Medium',
        servings: '4',
        ingredients: [
            '2 cups ROSHNI Multi-Grain Flour',
            '2 medium potatoes (boiled and mashed)',
            '1 onion (finely chopped)',
            '2 green chilies (chopped)',
            'Spices: cumin, coriander, garam masala',
            'Salt to taste',
            'Ghee for cooking',
        ],
        instructions: [
            'Prepare dough with flour, water, and salt',
            'Mix mashed potatoes with onions, chilies, and spices',
            'Divide dough into balls',
            'Roll out, place filling in center',
            'Seal and roll again gently',
            'Cook on hot tawa with ghee until golden',
            'Serve hot with yogurt or pickle',
        ],
    },
    {
        id: 4,
        title: 'Healthy Pancakes',
        image: '/images/recipe-bread.jpg',
        time: '15 mins',
        difficulty: 'Easy',
        servings: '2',
        ingredients: [
            '1 cup ROSHNI Multi-Grain Flour',
            '1 cup milk',
            '1 egg',
            '2 tbsp honey',
            '1 tsp baking powder',
            'Pinch of salt',
            'Butter for cooking',
        ],
        instructions: [
            'Mix all dry ingredients in a bowl',
            'Whisk together milk, egg, and honey',
            'Combine wet and dry ingredients',
            'Heat pan and add butter',
            'Pour batter to form pancakes',
            'Cook until bubbles form, then flip',
            'Serve with fresh fruits and honey',
        ],
    },
];

export default function RecipesPage() {
    const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark to-secondary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6">Delicious Recipes</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Discover healthy and tasty recipes using ROSHNI Multi-Grain Flour
                    </p>
                </div>
            </section>

            {/* Recipes Grid */}
            <section className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                {/* Recipe Image */}
                                <div className="relative h-64">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Recipe Content */}
                                <div className="p-6">
                                    <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">
                                        {recipe.title}
                                    </h3>

                                    {/* Meta Info */}
                                    <div className="flex gap-4 mb-4 text-sm text-text-light">
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-clock"></i> {recipe.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-signal"></i> {recipe.difficulty}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-users"></i> {recipe.servings}
                                        </span>
                                    </div>

                                    {/* Expand Button */}
                                    <button
                                        onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                                        className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                                    >
                                        <span>{expandedRecipe === recipe.id ? 'Hide' : 'View'} Recipe</span>
                                        <i className={`fas fa-chevron-${expandedRecipe === recipe.id ? 'up' : 'down'}`}></i>
                                    </button>

                                    {/* Expanded Content */}
                                    {expandedRecipe === recipe.id && (
                                        <div className="mt-6 space-y-6 animate-fade-in-up">
                                            {/* Ingredients */}
                                            <div>
                                                <h4 className="font-semibold text-lg text-text-dark mb-3">Ingredients:</h4>
                                                <ul className="space-y-2">
                                                    {recipe.ingredients.map((ingredient, index) => (
                                                        <li key={index} className="flex items-start gap-2 text-text-light">
                                                            <i className="fas fa-check text-primary mt-1"></i>
                                                            <span>{ingredient}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Instructions */}
                                            <div>
                                                <h4 className="font-semibold text-lg text-text-dark mb-3">Instructions:</h4>
                                                <ol className="space-y-2">
                                                    {recipe.instructions.map((instruction, index) => (
                                                        <li key={index} className="flex items-start gap-3 text-text-light">
                                                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                                {index + 1}
                                                            </span>
                                                            <span>{instruction}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cooking Tips */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-heading text-4xl font-bold text-text-dark mb-8 text-center">
                        Cooking Tips
                    </h2>
                    <div className="space-y-4">
                        {[
                            'Always knead the dough well for softer rotis and parathas',
                            'Let the dough rest for at least 15 minutes before rolling',
                            'Use warm water for better dough consistency',
                            'Store flour in an airtight container in a cool, dry place',
                            'Multi-grain flour absorbs more water than regular flour',
                        ].map((tip, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                                <i className="fas fa-lightbulb text-2xl text-accent mt-1"></i>
                                <p className="text-text-light">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
